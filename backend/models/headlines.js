var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
  article        : boolean,
  userId         : Number,
  headline       : String,
  dateCreated    : Number,
  voteCount      : Number
});

module.exports = mongoose.model('headline', PageSchema);
