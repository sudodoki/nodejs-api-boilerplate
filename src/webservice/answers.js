var error = require('../errors')
var Answers = require('../models/answers');
var _ = require('underscore')
module.exports = function(app){
  app.get('/api/my/answers', getAnswersForCurrentUser)
  app.post('/api/my/answers', setAnswersForCurrentUser)
}

function userQuiz(user_id, quiz_id) {
  return {
    _id: {
      responder: String(user_id),
      quiz: String(quiz_id)
    }
  }
}


function getAnswersForCurrentUser(req, res, next){
  Answers.findOne(userQuiz(req.user._id, req.query.quiz), '', function (err, doc) {
    if (err) return next(error.mongoError());
    res.json(doc)
  })
}

function setAnswersForCurrentUser(req, res, next){
  Answers.update(userQuiz(req.user._id, req.query.quiz),
                  {answers: req.body.answers},
                  {upsert:true},
                  function (err, userQuiz) {
                    console.log('SET DOC!')
                    if (err) return next(error.mongoError());
                    res.json('201', 'updated successfully')
                  })
}


