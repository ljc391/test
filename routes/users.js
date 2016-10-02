var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var models = require('../models');
var User = models.User;
var Post = models.Post;
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static('public'));

router.get('/', function(req, res){
    User.findAll({})
    .then(function(users){
        //console.log(users);
         res.render('index',{users:users} );
    });

});

router.get('/:id',function (req, res, next){
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(user){
        res.render('user', {user:user});
    })
    .catch(next());
})
router.get('/search/:name', function (req, res, next){ ;
    User.findByName(req.params.name)
    .then(function(user){

        res.render('user', {user:user});
    }).catch(next);
})
router.post('/',function(req, res,next){
    User.create({
        name: req.body.name
    })
    .then(function(user){
        res.status(201);
        res.redirect('/users');
    })
    .catch(next);
})

module.exports = router;