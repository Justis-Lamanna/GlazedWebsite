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

//Get a user by their user id. Stored in req.user.
function getUser(req, res, next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, {pass: 0, admin: 0, email:0}, function(err, user){
        if(err){
            return res.json({success: false, message: err});
        }
        else if(!user){
            return res.json({success: false, message: 'Invalid User'});
        }
        else{
            req.user = user;
            next();
        }
    })
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
router.get('/users/id/:id', getUser, function(req, res, next){
    res.json(req.user);
});

//Get a user by their name. Password hash, admin status, and email are suppressed.
router.get('/users/username/:id', function(req, res, next){
    db.users.findOne({
        username: req.params.id
    }, {pass: 0, admin: 0, email:0}, function(err, users){
        if(err){
            res.json({success: false, message: err});
        }
        else{
            res.json(users);
        }
    });
});

//Edit a user.
router.post('/users/id/:id', verify, function(req, res, next){
    let uid = req.params.id;
    req.body.lastactivity.date = new Date();
    console.log(req.body);
    db.users.update({_id: mongojs.ObjectId(uid)}, {$set: req.body}, function(err, count, status){
        if(err){
            res.json({success: false, message: err});
        }
        else{
            db.users.findOne({_id: mongojs.ObjectId(uid)}, {pass: 0, admin: 0, email:0}, function(err, user){
                if(err){
                    res.json({success: false, message: err});
                }
                else{
                    res.json({success: true, message: status, user: user});
                }
            });
        }
    });
});

/**
 * Get a user's game.
 * Return: The game object specified by the game id provided.
 */
router.get('/users/id/:id/game/:gid', getUser, function(req, res, next){
    let gid = req.params.gid;
    for(var index = 0; index < req.user.games.length; index++){
        if(req.user.games[index]._id = gid){
            return res.json({success: true, message: req.user.games[index]});
        }
    }
    res.json({success: false, message: "Invalid Game ID"});
});

/**
 * Get all Pokemon a user has.
 */
router.get('/users/id/:id/pkmn', getUser, function(req, res, next){
    res.json({success: false, message: req.user.pokemon});
});

/**
 * Get a Pokemon by ID.
 */
router.get('/users/id/:id/pkmn/:pid', getUser, function(req, res, next){
    let pid = req.params.pid;
    for(var index = 0; index < req.user.pokemon.length; index++){
        if(req.user.pokemon[index]._id == pid){
            return res.json({success: true, message: req.user.pokemon[index]});
        }
    }
    res.json({success: false, message: 'Invalid Pokemon'});
});

//Authenticates a user. If successful, a token and username is sent back.
router.post('/users/verify', function(req, res, next){
    db.users.findOne({username: req.body.username}, {admin: 0, email:0}, function(err, user){
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
                            db.users.update({_id: user._id}, {$set: {status: 1, logindate: (new Date()).toJSON()}});
                            user.pass = undefined;
                            res.json({success: false, token: token, user: user});
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
            db.users.update({_id: req.decoded.uid}, {$set: {status: 1}});
            res.json({success: true, token: token});
        }
    });
});

//Get the status of all users.
router.get('/users/status', verify, verifyAdmin, function(req, res, next){
    db.users.find({status: {$gt: 0}}, function(err, found){
        if(err){
            res.json({success: false, message: err});
        }
        else{
            res.json({success: true, users: found});
        }
    })
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