var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var AuthInfo = require('../models/authModel');


//对话框模式 省去get页面渲染方式

router.post('/',function(req, res, next){
    console.log('open post register');

    var username = req.body.username;
    var password = req.body.password;

    //是否合法的参数
    if (username == null || username.trim() == '' || password == null || password.trim() == '') {
        res.send({code: 500, message: '用户名密码不能为空'})
        return
    }

    var md5String = require('crypto').createHash('md5').update(password).digest('hex'); // md5

    //验证账号是否存在
    var queryString = {username: username};
    res.set({'Content-type': 'application/json;charset=utf-8'});

    AuthInfo.findOne(queryString).then(data => {
        return new Promise((resolve, reject)=>{
            if(data){
                console.log(data, 'data1')
                res.send({code: 500, message: '用户已经注册'});
                reject();
            }else{
                resolve();
            }
        }).then(()=>{
            //保存
            return new AuthInfo({
                username: username,
                userpswd: md5String
                // created: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }).save();
        }).then(data => {
            console.log(data, 'data2')
            if(data){
                //返回
                res.send({code: 1, message: '注册成功'})
                return;
            }
            // 返回
            res.send({code: 500, message: '注册失败'});
        }).catch(err => {
            // 异常
            if(err){
                res.status(500).send(err);
                console.log(err);
            }
        })
    })

});

module.exports = router;



