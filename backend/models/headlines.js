var mongoose = require('mongoose'),
schema = mongoose.Schema;

var HeadlineSchema = new schema({
  article        : String,
  authorName     : String,
  headline       : String,
  userId         : String,
  dateCreated    : Number,
  voteCount      : Number,
  threshold      : Number,
  subtitle       : String,
  link           : String
});

module.exports = mongoose.model('headline', HeadlineSchema);
