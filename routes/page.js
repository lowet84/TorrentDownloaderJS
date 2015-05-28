var express = require('express');
var router = express.Router();
var processUrls = require('../Utilities/processUrls');
var logon = require('../Utilities/logon');

var postFunction = function (req, res, next) {
    var login = req.body.login;
    var type = req.body.type;
    var urls = req.body.urls;

    var callback = function(ret){
        res.json(ret);
    };

    var next = function(jar){
        processUrls(callback, urls, jar);
    }

    logon(next, type,login);
};



router.post('/', postFunction);

module.exports = router;
