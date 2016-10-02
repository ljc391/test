'use strict';
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static('public'));

router.get('/', function(req, res){
    res.render('index' );
});

module.exports = router;