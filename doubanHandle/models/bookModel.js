let mongoose = require('mongoose');

let mongoosePaginate = require('mongoose-paginate');

let Schema = mongoose.Schema;

let BookListSchema = new Schema({
  title: String,
  bookId: Number,
  grade: Number,
  bookImg: String,
  bookInfo: String,
  description: String,
  flag: { type: Number, default: 0 }
});

BookListSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('BookList', BookListSchema, 'newbooks');
