var express = require('express');
var router = express.Router();

router.get('', function(req, res, next) {

    res.render('oauth2Callback');
});

module.exports = router;