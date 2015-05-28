var express = require('express');
var router = express.Router();
var request = require('request');
var processUrls = require('../Utilities/processUrls');
var logon = require('../Utilities/logon')

/* GET home page. */
router.post('/', function (req, res, next) {
    var urls = req.body.urls;
    var site = req.body.siteurl;
    var login = req.body.login;
    var type = req.body.type;

    for (i = 0; i < urls.length; i++) {
        urls[i] = site + urls[i];
    }

    var callback = function (ret) {
        res.json(ret);
    };

    var next = function(jar){
        processUrls(callback, urls, jar);
    };

    logon(next, type,login);
});

module.exports = router;
