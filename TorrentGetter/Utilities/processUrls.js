var request = require('request');

var processUrls = function (callback, urls, jar, ret) {
    if (urls.length == 0) {
        callback(ret);
        return;
    }

    if(ret == undefined){
        ret = [];
    }

    var url = urls[0];
    urls.splice(0, 1);

    request({uri: url, jar: jar, followRedirects:false}, function (err, resp, body) {
        if (err)
            return;

        ret.push({url: url, body: resp.body});
        processUrls(callback, urls, jar, ret);
    });
};

module.exports = processUrls;