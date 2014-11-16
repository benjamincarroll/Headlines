var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
  article        : Boolean,
  userId         : Number,
  headline       : String,
  dateCreated    : Number,
  voteCount      : Number,
  threshold      : Number
});

module.exports = mongoose.model('headline', PageSchema);
