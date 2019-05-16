let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let BookList = require('../models/bookModel');

router.post('/', function(req, res, next){
  console.log(req.body, 'add params')

  const title = req.body.title,
        bookInfo = req.body.bookInfo,
        bookImg = req.body.bookImg,
        grade = req.body.grade,
        description = req.body.description;

  let bookId = Math.floor(Math.random() * 100000000);

  function checkIn (i){
    BookList.find({bookId: i}).exec( function(err, data){  //查找是否存在该bookId
      if(err){
        res.status(500).json({ error: err });
      }else{
        if(data.length > 0){
          bookId --;
          checkIn(bookId);
        }
      }
    })
  }
  checkIn(bookId);


  const newBook = new BookList({
    title: title,
    bookId: bookId,
    grade: grade,
    bookImg: bookImg,
    bookInfo: bookInfo,
    description: description,
    $inc: { flag: 1 }
  });

  // 新增保存
  newBook.save((err, data) => {
    if(err){
      res.status(500).json({ error: err });
    }else{
      res.json({ code: 1, data: data });
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
