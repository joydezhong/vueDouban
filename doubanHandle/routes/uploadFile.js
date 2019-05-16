let fs = require('fs');
let path = require('path');

let express = require('express');
let router = express.Router();

let formidable = require('formidable');

router.post('/', function(req, res, next){
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8'; // 编码
  // 保留扩展名
  form.keepExtensions = true;
  //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.uploadDir = path.join(__dirname, '../public/images/');
  // 解析 formData 数据
  form.parse(req, (err, fields ,files) => {
    if(err) return next(err)
    let imgPath = files.file.path;
    let imgName = files.file.name;
    console.log(imgName, imgPath);
    let arr = imgPath.split('\\');
    res.json({code: 1, data: { name: imgName, path: 'http://192.168.31.18:3000/images/' + arr[arr.length-1] }});
  })



  // form.parse(req, function(error, fields, files){
  //   console.log(files);
  //   // fs.writeFileSync('public/test.png', fs.readFileSync(files.upload.path));
  //   // res.redirect('/public/upload.html');
  // })
  // res.json({ code: 1, message: 'oh shit' });
});

module.exports = router;

