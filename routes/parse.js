var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.post('/', function (req, res, next) {
    var html = req.body.html;
    var regex = new RegExp(req.body.regex, "g");
    var match = html.match(regex);

    var ret = [];
    for (i = 0; i < match.length; i++) {
        ret.push(match[i].match(req.body.regex)[1]);
    }

    res.json(ret);
});

module.exports = router;
