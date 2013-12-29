var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnswerCollectionSchema = new Schema({
  _id: Object,
  answers: [Number]
})

module.exports = mongoose.model('AnswerCollection', AnswerCollectionSchema)