module.exports = function(app){
  require('./user.js')(app);
  require('./quiz.js')(app);
}
