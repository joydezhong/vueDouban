let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let BookList = require('../models/bookModel');

router.post('/', function(req, res, next){
  let ids = req.body.id;
  let condition;
  if(Array.isArray(ids)){
    condition = {
      _id: { $in: ids }
    }
  }else{
    condition = {
      _id: ids
    }
  }

  BookList.remove(condition, (err, data) => {
    if(err){
      res.status(500).json({ error: err });
    }else{
      res.json({ code: 1, data: data })
    }
  })
});


module.exports = router;

