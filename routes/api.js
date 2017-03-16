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

router.post('/users', function(req, res, next){
    let username = String(req.body.username);
    let email = String(req.body.email);
    let pass = String(req.body.password);
    if(username == null || email == null || pass == null){
        res.json({error: true, reason: "Missing Credentials"});
    }
    else if(username.length < 6 || username.length > 20){
        res.json({error: true, reason: "Username not the correct size."});
    }
    else if(!username.match(/^[A-Za-z0-9\-_]*$/)){
        res.json({error: true, reason: "Invalid username."});
    }
    else if(email.length > 50){
        res.json({error: true, reason: "Email too long."});
    }
    else if(!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\-.]+$/)){
        res.json({error: true, reason: "Invalid email"});
    }
    else if(pass.length < 6 || pass.length > 20){
        res.json({error: true, reason: "Password not the correct size."});
    }
    else{
        crypto(pass).hash(function(error, hash){
            if(error){
                res.json({error: true, reason: "Error with password hash."});
            }
            else{
                let cred = {
                    username: username,
                    email: email,
                    pass: hash
                };
                db.users.insert(cred, function(err, result){
                    if(err){
                        res.json({error: true, reason: "Error storing in database."});
                    }
                    else{
                        res.json({error: false, reason: null});
                    }
                });
            }
        });
    }
});

module.exports = router;