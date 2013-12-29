var request = require('request');
var utils = require('../utils.js')();
var expect = require('chai').expect;
var async = require('async');
var _ = require('underscore');
var Quiz = require('../../src/models/quiz')

var user = {
  name: "User1",
  id: 100
};


describe("We should be able to manipulate answers per user", function(){
  var quizStab, userJar;

  before(function(done){
    userJar = utils.authenticate(user, done);
  })

  before(function(done){
    utils.clean('Answers', done);
  })

  before(function(done){
    utils.spawn('Quiz', {
        quizes: [
          {
            q: 'Some awesome question?',
            a: ['one', 'two', 'three']
          }
        ]
      }, function(err, doc){
        quizStab = doc;
        done()
      })
  })
  it("POST /api/my/answers?quiz=q_id should set quiz answers for user", function(done){
    request.post(utils.url('/api/my/answers?quiz=' + quizStab._id), {jar: userJar, form: {answers: [1,2,3]}}, function(err, res, body){
      expect(res).to.have.property('statusCode', 201);
      done()
    })
  });
  it("GET /api/my/answers?quiz=q_id should get quiz answers for user", function(done){
    request.get(utils.url('/api/my/answers?quiz=' + quizStab._id), {jar: userJar, form: {answers: [1,2,3]}}, function(err, res, body){
      var answers = JSON.parse(body)
      expect(res).to.have.property('statusCode', 200);
      expect(answers).to.have.property('answers')
        .that.is.an('array')
        .that.deep.equals([1,2,3])
      done()
    })
  });
})



