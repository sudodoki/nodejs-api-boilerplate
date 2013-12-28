var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuizCollectionSchema = new Schema({
  author: Schema.Types.ObjectId,
  quizes: [Schema.Types.Object]
})

module.exports = mongoose.model('QuizCollection', QuizCollectionSchema)
