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

router.get('/sf0Ip', function(req, res, next) {
  res.render('sf0Ip', { title: 'Express' });
});
router.get('/sf0IpConfig.json', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ="select * from sf0_ip order by index ";
  pg.query(sql, function (result) {
  res.jsonp(result.rows);
});

})

router.get('/sf0Terminal', function(req, res, next) {
  res.render('sf0Terminal', { title: 'Express' });
});
router.get('/sf0TerminalConfig.json', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ="select * from sf0_terminal order by index ";
  pg.query(sql, function (result) {
  res.jsonp(result.rows);
});

})

router.get('/sf0Device', function(req, res, next) {
  res.render('sf0Device', { title: 'Express' });
});
router.get('/deviceList.json', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ="select * from sf0_device order by index ";
  pg.query(sql, function (result) {
  res.jsonp(result.rows);
});

})