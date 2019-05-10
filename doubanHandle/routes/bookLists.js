let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let BookList = require('../models/bookModel');

router.get('/', function(req, res, next){

  console.log(req.query, 'url params');

  let filters = { ...req.query };

  console.log(filters, 'filter');

  let query = {};

  if(filters.title){
    query.title = filters.title
  }
  if(filters.author){
    query.bookInfo = {$regex: filters.author}
  }

  BookList.paginate(query, { page: Number(filters.pageNum), limit: Number(filters.pageSize) }, function(err, data) {
    if(err){
      res.status(500).json({ error: err });
    }else{
      res.json({ code: 1, data: data });
    }
  });


  // console.log(filters.pageSize, (filters.pageNum - 1) * filters.pageNum);
  //
  // let limit = Number(filters.pageSize);
  // let skip = Number((filters.pageNum - 1) * filters.pageNum);
  //
  // BookList.find(query, null, {
  //   limit: limit,
  //   skip: skip
  // }, (err, data) => {  //查找所有
  //   if(err){
  //     res.status(500).json({ error: err });
  //   }else{
  //     res.json({ code: 1, data: data });
  //   }
  // })

  // BookList.find(query).limit(limit).skip(skip).exec( function(err, data){  //查找所有
  //   if(err){
  //     res.status(500).json({ error: err });
  //   }else{
  //     res.json({ code: 1, data: data });
  //   }
  // })

});


module.exports = router;
