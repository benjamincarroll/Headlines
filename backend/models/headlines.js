var mongoose = require('mongoose'),
schema = mongoose.Schema;

var HeadlineSchema = new schema({
  article        : String,
  userId         : String,
  headline       : String,
  dateCreated    : Number,
  voteCount      : Number,
  threshold      : Number,
  category       : String
});

module.exports = mongoose.model('headline', HeadlineSchema);
