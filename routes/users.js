var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  // res.render('index', { title: req.param("val") });
    res.send("req param val value: " + req.param("val"));
});

module.exports = router;
