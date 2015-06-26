var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
    if(req.query.site == undefined)
    {
        res.redirect('../');
    }
    res.render('edit',{site:req.query.site});
});

module.exports = router;