var mongoose = require('mongoose'),
var schema = mongoose.Schema;

var HeadlineSchema = new schema({
  article        : String,
  userId         : Number,
  headline       : String,
  dateCreated    : Number,
  voteCount      : Number,
  threshold      : Number
});

module.exports = mongoose.model('headline', HeadlineSchema);
