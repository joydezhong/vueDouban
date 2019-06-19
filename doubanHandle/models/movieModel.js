let mongoose = require('mongoose');

let mongoosePaginate = require('mongoose-paginate');

let Schema = mongoose.Schema;

let MovieSchema = new Schema({
  title: String,
  movieId: Number,
  copyrightInfo: String,
  grade: String,
  remark: String,
  movieImg: String,
  description: String
});

MovieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('MovieList', MovieSchema, 'topMovieList');
