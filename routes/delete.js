var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res, next) {
    if (req.query.site == undefined || req.cookies['siteLogin-' + req.query.site] == undefined) {
        res.redirect('../');
    }
    clearCookies(req.query.site,res);
    res.redirect('../');
});

function clearCookies(name, res){
    res.clearCookie('siteLogin-'+name);
}

module.exports = router;
