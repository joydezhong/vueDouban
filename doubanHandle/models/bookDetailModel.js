let mongoose = require('mongoose');

let mongoosePaginate = require('mongoose-paginate');

let Schema = mongoose.Schema;

let BookDetailSchema = new Schema({
  title: String,
  bookId: Number,
  bookInfo: String,
  bookInfoHtml: String,
  grade: Number,
  bookImg: String,
  contentInfo: String,
  contentInfoHtml: String,
  authorInfo: String,
  authorInfoHtml: String,
  catalogInfo: String,
  catalogInfoHtml: String
});

BookDetailSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('BookDetail', BookDetailSchema, 'bookDetails');
