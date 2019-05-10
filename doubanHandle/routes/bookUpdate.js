let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let BookList = require('../models/bookModel');

router.post('/', function(req, res, next){
  // console.log(req.body, 'update params')

  const id = req.body._id,
    title = req.body.title,
    grade = req.body.grade,
    description = req.body.description;

  const updateStr = {
    title: title,
    grade: grade,
    description: description
  };
  const ids = {
    _id: id
  }
  // 通过_id更新指定指字段
  BookList.findByIdAndUpdate(ids, updateStr, (err, data) => {
    if(err){
      res.status(500).json({ error: err });
    }else{
      res.json({ code: 1, data: data })
    }
  });

  // BookList.update({bookId: req.body.id}, req.body, (err, data) => {
  //   if(err){
  //     res.status(500).json({ error: err });
  //   }else{
  //     res.json({ code: 1, data: data })
  //   }
  // })
});


module.exports = router;
