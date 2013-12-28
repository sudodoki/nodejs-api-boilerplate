var error = require('../errors')
var Quiz = require('../models/quiz');
module.exports = function(app){
  app.get('/quiz', getAll);
  app.get('/quiz/:id', getById);
  app.post('/quiz', create);
}

function getAll(req, res, next){
  Quiz.find({}, function (err, docs) {
    if (err) { console.log(err); }
    res.json(docs);
  })
}

function getById(req, res, next){
  Quiz.findOne({_id:req.params.id}, function (err, doc) {
    if (err) { console.log(err); }
    res.json(doc);
  })
}

function create(req, res, next){
  Quiz.create({author: req.user._id, quizes: req.body.quizes}, function(err, quiz) {

    if (err) return next(error.mongoError());
    res.json(201, quiz);
  })

}

