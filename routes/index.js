var express = require('express');
var router = express.Router();
var pack = require('../package.json');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'VirusAnimation', version: pack.version});
});

module.exports = router;
