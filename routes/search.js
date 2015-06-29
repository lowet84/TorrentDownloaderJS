var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.query.site == undefined || req.cookies['siteSearch-' + req.query.site+'-'+req.query.name] == undefined) {
        res.redirect('../');
    }

    res.render('search', {search: req.cookies['siteSearch-' + req.query.site+'-'+req.query.name], site:req.query.site});
});

router.post('/', function (req, res, next) {
    if (req.body.submit == 'Save' && req.body.name != undefined && req.body.name != '') {
        var siteSearch = {
            name: req.body.name,
            url: req.body.url,
            site:req.body.site
        };
        var cookieName = 'siteSearch-' + req.body.site+'-'+req.body.name;
        clearCookies(req.body.cookieName, res);
        res.cookie(cookieName, siteSearch, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 356 * 5)});
    }
    res.redirect('../edit?site='+req.body.site);
});

function clearCookies(name, res){
    res.clearCookie('siteLogin-'+name);
}

module.exports = router;