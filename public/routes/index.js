var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//   res.json("Welcome");
    res.send('<h1>Hello World!</h1>');
});

module.exports = router;
