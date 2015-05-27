var express = require('express');
var request = require('request');
var parser = require('cookie-parser');
var router = express.Router();

var postFunction = function (req, res, next) {
    var urls = req.body.urls;
    var ret = [];
    var jar = request.jar();

    processUrls(urls, ret, jar, res);
};

var processUrls = function (urls, ret, jar, res) {
    if (urls.length == 0) {
        res.json(ret);
        return;
    }

    var url = urls[0];
    urls.splice(0, 1);

    request({uri: url, jar: jar}, function (err, resp, body) {
        if (err)
            throw err;

        ret.push({url: url, body: resp.body});
        processUrls(urls,ret,jar, res);
    });
};

router.post('/', postFunction);

module.exports = router;
