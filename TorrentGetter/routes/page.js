var express = require('express');
var request = require('request');
var parser = require('cookie-parser')
var router = express.Router();

router.post('/', function (req, res, next){
    var url = req.body.url;
    var jar = null;

    if(req.body.cookies != undefined){
        jar = req.body.cookies;
    }
    else{
        jar = request.jar();
    }

    request({url:url, jar:jar}, function(err, resp, body) {
        if (err)
            throw err;

        res.json({cookies:jar, body:body});
    });
});

module.exports = router;
