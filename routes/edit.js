var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.query.site == undefined || req.cookies['siteLogin-' + req.query.site] == undefined) {
        res.redirect('../');
    }

    var searches = []
    for (var cookie in req.cookies) {
        if (cookie.lastIndexOf('siteSearch-' + req.query.site + '-', 0) === 0) {
            var search = req.cookies[cookie];
            searches.push(search);
        }
    }

    res.render('edit', {site: req.cookies['siteLogin-' + req.query.site], searches: searches});
});

router.post('/', function (req, res, next) {
    if (req.body.submit == 'Save' && req.body.name != undefined && req.body.name != '') {
        var siteLogin = {
            name: req.body.name,
            url: req.body.url,
            postData: 'username=' + req.body.username + '&password=' + req.body.password + '&login=' + req.body.submitText
        };
        var cookieName = 'siteLogin-' + req.body.name;
        clearCookies(req.body.original, res);
        res.cookie(cookieName, siteLogin, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 356 * 5)});
    }
    else if (req.body.submit == 'Add' && req.body.searchName != undefined && req.body.searchName != '') {
        res.cookie('siteSearch-' + req.body.name + '-' + req.body.searchName, {name: req.body.searchName}, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 356 * 5)});
        res.redirect('/search?site=' + req.body.original + '&search=' + req.body.searchName);
    }
    res.redirect('../');
});

function clearCookies(name, res) {
    res.clearCookie('siteLogin-' + name);
}

module.exports = router;