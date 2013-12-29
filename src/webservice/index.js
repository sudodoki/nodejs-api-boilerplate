module.exports = function(app){
  require('./user.js')(app);
  require('./quiz.js')(app);
  require('./answers.js')(app);
}
