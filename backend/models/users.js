var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
  name           : String,
  twitterInfo    : String,
});

module.exports = mongoose.model('user', PageSchema);
