var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
  name           : String,
  twitterInfo    : Boolean,
  articleId      : Number,
  headlineId     : Number,
});

module.exports = mongoose.model('user', PageSchema);
