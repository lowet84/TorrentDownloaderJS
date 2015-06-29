var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
    var sites = [];
    for (var cookie in req.cookies) {
        if (cookie.lastIndexOf('siteLogin-', 0) === 0) {
            var site = req.cookies[cookie];
            sites.push(site);
        }
    }
    res.render('index', {sites: sites});
});

router.post('/', function (req, res, next) {
    if (req.body.name != undefined && req.body.name != '') {
        res.cookie('siteLogin-' + req.body.name, {name: req.body.name}, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 356 * 5)});
        res.redirect('/edit?site=' + req.body.name);
    }
    res.render('index', {sites: sites});
});

module.exports = router;
