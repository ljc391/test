'use strict';
var express = require("express");
var router = express.Router();
var models = require('../models');
var Post = models.Post;
var User = models.User;
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static('public'));

router.get('/',function (req, res, next){
    if(Object.keys(req.query).length !=0){
        return next();
    }
    Post.findAll()
    .then(function(posts){
        res.render('post', {posts:posts})
    })
    .catch(next);
});

router.get("/", function (req, res, next){
    var text = req.query.text;
    Post.findAll({
        where:{
            content:{
                 $like: '%'+text+'%',
            }
        }
    })
    .then(function(posts){
        res.render('post', {posts:posts})
    });
});

router.post('/', function (req, res, next){
    User.findOne({
        where:{
            name:"nomi"
        }
    })
    .then(function(user){
        return Post.create({
        title: req.body.title,
        content: req.body.content
        })
        .then(function(post){
            return post.setOwner(user);
        });
    })
    .then(function(posts){

        res.redirect('/posts');
    })
    .catch(next);
    // var user = {name:"elaine"};
    // Post.create({
    //     title: req.body.title,
    // //    titleUrl: "ab",
    //     content: req.body.content
    // })
    // .then(function(post){
    //     return post.setOwner(user);
    // })
    // .then(function(post){
    //     res.redirect('/posts');
    // })
    // .catch(next);
})

router.get('/:titleUrl', function (req, res, next){
    Post.findOne({
        where:{
            titleUrl: req.params.titleUrl
        }
    })
    .then(function(post){
        res.render('spost',{post:post});
    })
});
router.get('/:titleUrl/findsameuser', function (req, res, next){
    Post.findOne({
        where:{
            titleUrl: req.params.titleUrl
        }
    })
    .then(function(post){
       return post.findSameUser();
    })
    .then(function(posts){
        res.render('post', {posts:posts});
    })
});

module.exports = router;