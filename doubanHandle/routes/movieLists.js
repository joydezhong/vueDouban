let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let MovieList = require('../models/movieModel');

router.get('/', function(req, res, next){

  console.log(req.query, 'url params');

  let filters = { ...req.query };

  console.log(filters, 'filter');

  let query = {};

  if(filters.title){
    query.title = filters.title
  }
  if(filters.author){
    query.copyrightInfo = {$regex: filters.copyrightInfo}
  }
  if(filters.grade){
    let start = filters.grade.split(',')[0];
    let end = filters.grade.split(',')[1];
    query.grade = {$gte: Number(start), $lt: Number(end)};
  }

  MovieList.paginate(query, { page: Number(filters.pageNum), limit: Number(filters.pageSize) }, function(err, data) {
    if(err){
      res.status(500).json({ error: err });
    }else{
      res.json({ code: 1, data: data });
    }
  });
});


module.exports = router;
