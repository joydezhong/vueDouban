var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var AuthInfo = require('../models/authModel');

var jwt = require('jsonwebtoken');


//对话框模式 省去get页面渲染方式

router.post('/',function(req, res, next){
    console.log('open post Login');

    var username = req.body.username;
    var password = req.body.password;

    //是否合法的参数
    if (username == null || username.trim() == '' || password == null || password.trim() == '') {
        res.send({code: 500, message: '用户名密码不能为空'})
        return
    }

    var md5String = require('crypto').createHash('md5').update(password).digest('hex'); // md5

    //验证账号是否存在
    var queryString = {username: username, userpswd: md5String};
    res.set({'Content-type': 'application/json;charset=utf-8'});
    console.log(queryString)

    var tokenString = require('crypto').createHash('md5').update(JSON.stringify(queryString)).digest('hex'); // md5 token

    AuthInfo.findOne(queryString).then(data => {
        return new Promise((resolve, reject)=>{
            if(data){
               resolve(data);
            }else{
            	res.send({code: 500, message: '用户名或密码错误'})
              reject();
            }
        }).then(data => {
        		console.log(data);

        		/***jwt生成token***/
            let content = {username: username};  // 要生成token的主题信息
            let secretOrPrivateKey= "This is perfect projects."; // 这是加密的key（密钥） 根据个人自定义
            let token = jwt.sign(content, secretOrPrivateKey, {
              expiresIn: 60 * 60 * 24 * 7  // 一周过期
            });

        		res.send({ code: 1, message: '登陆成功', token: token })
        })
    }).catch( err => {
    	if(err){
          res.status(500).send(err);
          console.log(err);
        }
    })

});

module.exports = router;
