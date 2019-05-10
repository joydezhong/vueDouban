let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let BookList = require('../models/bookModel');

router.post('/', function(req, res, next){
  // console.log(req.body.id, 'param id')  // 查找指定bookId
  BookList.remove({bookId: req.body.id}, (err, data) => {
    if(err){
      res.status(500).json({ error: err });
    }else{
      res.json({ code: 1, data: data })
    }
  })
});


module.exports = router;

