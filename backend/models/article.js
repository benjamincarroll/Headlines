var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  userId         : Number,
  headlineId     : Number,
  article        : String,
  dateCreated    : Number
});

module.exports = mongoose.model('article', ArticleSchema);
