let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let BookDetail = require('../models/bookDetailModel');

router.get('/', function(req, res, next){

  console.log(req.query, 'url params');

  const bookId = req.query.bookId || '';

  // BookDetail.paginate({}, { page: Number(req.query.pageNum), limit: Number(req.query.pageSize) }, function(err, data) {
  //   if(err){
  //     res.status(500).json({ error: err });
  //   }else{
  //     res.json({ code: 1, data: data });
  //   }
  // });

  BookDetail.findOne({ bookId: bookId }, (err, data) => { //查找所有
    if(err){
      res.status(500).json({ error: err });
    }else{
      res.json({ code: 1, data: data });
    }
  })
});


module.exports = router;
