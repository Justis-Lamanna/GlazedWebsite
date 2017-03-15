var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://GlazedSite:gpword0714@localhost:27017/glazed');

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

router.get('/users/email/:id', function(req, res, next){
    db.users.findOne({
        email: req.params.id
    }, function(err, users){
        if(err){
            res.send(err);
        }
        else{
            res.json(users);
        }
    });
});

module.exports = router;