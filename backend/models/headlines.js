var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
  articleId      : Number,
  userId         : Number,
  headline       : String,
  dateCreated    : Number,
  voteCount      : Number
});

module.exports = mongoose.model('headline', PageSchema);
