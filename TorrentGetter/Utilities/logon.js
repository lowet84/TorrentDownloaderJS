var express = require('express');
var request = require('request');
var router = express.Router();

var login = function (next, name, data) {
    var jar = request.jar();
    if (name == "ILoveTorrents") {
        request({uri: data, jar: jar}, function (err, resp, body) {
            if (err)
                return;

            next(jar);
        });
    }
    else if (name == "TorrentBytes") {
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