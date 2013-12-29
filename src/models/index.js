var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

module.exports = {
  User: require('./user.js'),
  Quiz: require('./quiz.js'),
  Answers: require('./answers.js')
}
