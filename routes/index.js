var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
    var sites = [];
    for (var cookie in req.cookies) {
        if(cookie.lastIndexOf('siteLogin-', 0) === 0) {
            var site = req.cookies[cookie];
            sites.push(site);
        }
    }
    res.render('index', {sites:sites});
});

router.post('/', function (req, res, next) {
    var siteLogin = {
        name:req.body.name,
        url: req.body.url,
        postData: 'username=' + req.body.username + '&password=' + req.body.password + '&login=' + req.body.submintText
    };
    res.cookie('siteLogin-' + req.body.name, siteLogin, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 356 * 5)});
    res.render('index', {});
});

module.exports = router;
