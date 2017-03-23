var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://GlazedSite:gpword0714@localhost:27017/glazed');
var crypto = require('password-hash-and-salt');
var jwt = require('jsonwebtoken');

var secret = 'quilavasilvallymew';

//Verify the token.
function verify(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, secret, function(err, decoded){
            if(err){
                return res.json({success: false, tokenfail: true, message: 'Failed to authenticate token'});
            }
            else{
                req.decoded = decoded;
                next();
            }
        });
    }
    else{
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}

//Verify the token is of an admin.
function verifyAdmin(req, res, next){
    db.users.findOne({
        _id: mongojs.ObjectId(req.decoded.uid)
    }, function(err, user){
        if(err){
            return res.json({success: false, message: 'Error reading database.'});
        }
        else if(user.admin != true){
            return res.json({success: false, message: 'Insufficient permissions.'});
        }
        else{
            next();
        }
    })
}

//Verify the user in the token equals the user in the passed in parameter.
//An user with admin priviledges also suffices.
function verifyUser(req, res, next){
    if(req.decoded.uid != req.params.id){
        db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, users){
            if(err){
                return res.json({success: false, message: 'Error reading database.'});
            }
            else if(!users){
                return res.json({success: false, message: 'Invalid user.'});
            }
            else if(users.admin){
                next();
            }
            else{
                return res.json({success: false, message: 'Cannot modify anothers profile.'});
            }
        });
    }
    else{
        next();
    }
}

//Get a list of all users. Must have a valid token and be an admin to view.
router.get('/users', verify, verifyAdmin, function(req, res, next){
    db.users.find(function(err, users){
        if(err){
            res.json({success: false, message: 'Error reading database.'});
        }
        else{
            res.json(users);
        }
    });
});

//Get a user by their id. Password hash, admin status, and email are suppressed.
router.get('/users/id/:id', function(req, res, next){
    try{
        db.users.findOne({
            _id: mongojs.ObjectId(req.params.id)
        }, {pass: 0, admin: 0, email:0}, function(err, users){
            if(err){
                res.json({success: false, message: 'Error reading database.'});
            }
            else{
                res.json(users);
            }
        });
    }
    catch(err){
        res.json({success: false, message: 'Invalid ID.'});
    }
});

//Get a user by their name. Password hash, admin status, and email are suppressed.
router.get('/users/username/:id', function(req, res, next){
    db.users.findOne({
        username: req.params.id
    }, {pass: 0, admin: 0, email:0}, function(err, users){
        if(err){
            res.json({success: false, message: 'Error reading database.'});
        }
        else{
            res.json(users);
        }
    });
});

router.post('/users/id/:id', verify, verifyUser, function(req, res, next){
    let uid = req.params.id;
    db.users.update({_id: mongojs.ObjectId(uid)}, {$set: req.body}, function(err, count, status){
        if(err){
            res.json({success: false, message: 'Error reading database.'});
        }
        else{
            res.json({success: true, message: status});
        }
    });
});


/**
 * Add a game to the list.
 */
router.post('/users/id/:id/game', verify, function(req, res, next){
    let uid = req.params.id;
    let game = req.body;
    db.users.findOne({_id: mongojs.ObjectId(uid)}, function(err, user){
        if(err){
            res.json({success: false, message: err});
        }
        else{
            game._id = mongojs.ObjectId();
            user.games.push(game);
            db.users.update({_id: mongojs.ObjectId(uid)}, user, function(err, count, result){
                if(err){
                    return res.json({success: false, message: err});
                }
                else{
                    return res.json({success: true, message: game});
                }
            });
        }
    });
});

/**
 * Get a user's game.
 * Return: The game object specified by the game id provided.
 */
router.get('/users/id/:id/game/:gid', verify, function(req, res, next){
    let uid = req.params.id;
    let gid = req.params.gid;
    db.users.findOne({_id: mongojs.ObjectId(uid)}, function(err, user){
        if(err){
            res.json({success: false, message: err});
        }
        else{
            for(var index = 0; index < user.games.length; index++){
                if(user.games[index]._id == gid){
                    res.json({success: true, message: user.games[index]});
                    return;
                }
            }
            res.json({success: false, message: "Invalid GID"});
        }
    });
});

/**
 * Update an existing game.
 */
router.post('/users/id/:id/game/:gid', verify, function(req, res, next){
    let uid = req.params.id;
    let gid = req.params.gid;
    let game = req.body;
    db.users.findOne({_id: mongojs.ObjectId(uid)}, function(err, user){
        if(err){
            res.json({success: false, message: err});
        }
        else{
            for(var index = 0; index < user.games.length; index++){
                if(user.games[index]._id == gid){
                    user.games[index] = game;
                    db.users.update({_id: mongojs.ObjectId(uid)}, {$set: {games: user.games}}, function(err, count, result){
                        if(err){
                            return res.json({success: false, message: err});
                        }
                        else{
                            return res.json({success: true, message: result});
                        }
                    });
                }
            }
            return res.json({success: false, message: "No match found"});
        }
    });
});


//Authenticates a user. If successful, a token and username is sent back.
router.post('/users/verify', function(req, res, next){
    db.users.findOne({username: req.body.username}, function(err, user){
        if(err){
            res.json({success: false, message: 'Error reading database.'});
        }
        else if(user == null){
            res.json({error: true, reason: 'Invalid username.'});
        }
        else{
            crypto(req.body.pass).verifyAgainst(user.pass, function(error, verify){
                if(err){
                    res.json({error: true, reason: 'Hash failed.'});
                }
                else if(!verify){
                    res.json({error: true, reason: 'Invalid password.'});
                }
                else{
                    //We need a token!
                    jwt.sign({uid: user._id}, secret, {expiresIn: req.body.remember ? 60*60*24*365 : 60*60*24}, function(err, token){
                        if(err){
                            res.json({success: false, message: 'Error signing.'});
                        }
                        else{
                            res.json({success: false, username: user.username, token: token, uid: user._id});
                        }
                    });
                }
            });
        }
    });
});

//Refeshes a token.
router.post('/users/refresh', verify, function(req, res, next){
    jwt.sign({uid: req.decoded.uid}, secret, {expiresIn: 60*60*24}, function(err, token){
        if(err){
            res.json({success: false, message: 'Error signing: ' + err});
        }
        else{
            res.json({success: true, token: token});
        }
    });
});

//Adds a user.
router.post('/users', function(req, res, next){
    let username = String(req.body.username);
    let email = String(req.body.email);
    let pass = String(req.body.password);
    if(username == null || email == null || pass == null){
        console.log(`${req.body}: Missing Credentials.`);
        res.json({error: true, reason: "Missing Credentials."});
    }
    else if(username.length < 6 || username.length > 20){
        console.log(`${req.body}: Username not the correct size.`);
        res.json({error: true, reason: "Username not the correct size."});
    }
    else if(!username.match(/^[A-Za-z0-9\-_]*$/)){
        console.log(`${req.body}: Invalid Username.`);
        res.json({error: true, reason: "Invalid username."});
    }
    else if(email.length > 50){
        console.log(`${req.body}: Email too long.`);
        res.json({error: true, reason: "Email too long."});
    }
    else if(!email.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\-.]+/)){
        console.log(`${req.body}: Invalid email.`);
        res.json({error: true, reason: "Invalid email."});
    }
    else if(pass.length < 6 || pass.length > 20){
        console.log(`${req.body}: Password not the correct size.`);
        res.json({error: true, reason: "Password not the correct size."});
    }
    else{
        crypto(pass).hash(function(error, hash){
            if(error){
                console.log(`${req.body}: Error hashing password: ${error}`);
                res.json({error: true, reason: "Error with password hash."});
            }
            else{
                let cred = {
                    username: username,
                    email: email,
                    pass: hash,
                    regdate: (new Date()).toJSON(),
                    confirmed: false
                };
                db.users.insert(cred, function(err, result){
                    if(err){
                        console.log(`${req.body}: Error storing in database: ${req.body}`);
                        res.json({error: true, reason: "Error storing in database."});
                    }
                    else{
                        console.log(`${req.body}: Registration successful.`);
                        res.json({error: false, return: cred});
                    }
                });
            }
        });
    }
});

//Anything that does not match gets a 403 Forbidden page.
router.get('*', function(req, res, next){
    res.status(403).send('Forbidden');
});

//Anything that does not match gets a 403 Forbidden page.
router.post('*', function(req, res, next){
    res.status(403).send('Forbidden');
});

module.exports = router;