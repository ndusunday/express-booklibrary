var express = require('express');
var router = express.Router();
var cool = require('./cool');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.use('/cool', cool);

module.exports = router;
