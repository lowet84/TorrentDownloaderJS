var express = require('express');
var request = require('request');
var router = express.Router();

router.post('/', function (req, res, next){
    var url = req.body.url;
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        var x = 0;
    });
    res.json({id:0});
});

module.exports = router;
