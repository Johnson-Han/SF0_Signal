var express = require('express');
var router = express.Router();
var pg1 = require('./pgconn');
var path = require('path');
var fs = require('fs');
var pg = require('./pgconn');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index2', { title: 'Express' });
});

module.exports = router;
router.get('/sf0List.json', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ="select * from sf0_variable order by index ";
  pg.query(sql, function (result) {
  res.jsonp(result.rows);
});

})
