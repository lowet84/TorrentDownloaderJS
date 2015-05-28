var express = require('express');
var request = require('request');
var router = express.Router();

var login = function (next, type, data) {
    var jar = request.jar();
    if (type == 0) {
        request({uri: data, jar: jar}, function (err, resp, body) {
            if (err)
                return;

            next(jar);
        });
    }
    else if (type == 1) {
        var url = data.url;
        var postData = data.postData;
        request.post({uri: url, jar: jar, form:postData, contentType:'application/x-www-form-urlencoded'}, function (err, resp, body) {
            if (err)
                return;

            next(jar);
        });
    }
};

module.exports = login;