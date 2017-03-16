var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://GlazedSite:gpword0714@localhost:27017/glazed');
var crypto = require('password-hash-and-salt');

router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err){
            res.send(err);
        }
        else{
            res.json(users);
        }
    });
});

router.get('/users/id/:id', function(req, res, next){
    db.users.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, users){
        if(err){
            res.send(err);
        }
        else{
            res.json(users);
        }
    });
});

router.get('/users/username/:id', function(req, res, next){
    db.users.findOne({
        username: req.params.id
    }, function(err, users){
        if(err){
            res.send(err);
        }
        else{
            res.json(users);
        }
    });
});

router.post('/users/verify', function(req, res, next){
    db.users.findOne({username: req.body.username}, function(err, user){
        if(err){
            res.send(err);
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
                    res.json({error: false});
                }
            });
        }
    });
})

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

module.exports = router;