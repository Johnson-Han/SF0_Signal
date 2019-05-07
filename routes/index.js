var express = require('express');
var router = express.Router();
var pg1 = require('./pgconn');
var path = require('path');
var fs = require('fs');
var pg = require('./pgconn');

//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */
function readFile(path, filesList) {
  files = fs.readdirSync(path);//需要用到同步读取
  files.forEach(walk);
  function walk(file,index) {
    states = fs.statSync(path + '/' + file);
    if (states.isFile() && file.slice(0, 2) != "回复")
    // {
    //     readFile(path+'/'+file,filesList);
    // }
    // else
    {
      //创建一个对象保存信息
      var obj = new Object();
      obj.size = (states.size / 1024 / 1024).toFixed(1);//文件大小，以字节为单位
      // obj.name = file.slice(10, -4);//文件名
      obj.name = file;
      obj.path = (path + '/' + file).slice(8); //文件绝对路径
      obj.mtime = states.mtime;
      obj.time = file.slice(1, 9);
      obj.index = index;

      filesList.push(obj);
    }
  }
}

function getFileList(path)
{
   var filesList = [];
   readFile(path,filesList);
   return filesList;
}

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

router.get('/sf0File', function(req, res, next) {
  res.render('sf0File', { title: 'Express' });
});

router.get('/:system_name', function(req, res, next) {
  res.render('fileList', { title:req.params.system_name });
});

router.get('/fileList/:table_url', function(req, res, next) {
  // fs.readdir("./public/files/TMSR-LF1工程/初步设计/01.设计输入参数",function(err,files){
    // console.log(files);
      filelist=getFileList(`./public/files/${req.params.table_url}`);
      res.jsonp(filelist);
    
  });