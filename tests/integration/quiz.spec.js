var request = require('request');
var utils = require('../utils.js')();
var expect = require('chai').expect;
var async = require('async');
var _ = require('underscore');

var user = {
  name: "User1",
  id: 100
};

describe("authenticated user with premissions", function(){
  var userJar;
  var quizStab = {
        quizes: [
          {
            q: 'Some awesome question?',
            a: ['one', 'two', 'three']
          }
        ]
      };
  beforeEach(function(done){
    utils.clean('QuizCollection', done)
  })
  before(function(done){
    userJar = utils.authenticate(user, done);
  })

  it("GET /quiz should return all quizes", function(done){
    request.get(utils.url('/quiz'), {jar: userJar }, function(err, res, body){
      expect(res).to.have.property('statusCode', 200);
      expect(JSON.parse(body)).to.eql([])
      done();
    });
  });
  it("POST /quiz should create new quiz", function(done){

    request.post(utils.url('/quiz'), {form: quizStab, jar: userJar }, function(err, res, body){
      expect(res).to.have.property('statusCode', 201);
      quizStab = _.extend(quizStab, body)
      done()
    });
  });
  describe('Quiz actions',function(){
    beforeEach(function(done){
      request.post(utils.url('/quiz'), {form: quizStab, jar: userJar }, function(err, res, body){
        quizStab = _.extend(quizStab, JSON.parse(body))
        done()
      });
    });
  it("GET /quiz/:id should return single quiz", function(done){
    request.get(utils.url('/quiz/'+quizStab._id), {jar: userJar }, function(err, res, body){
      expect(res).to.have.property('statusCode', 200);
      console.log(body)
      expect(body).to.beDefined();
      done();
    });
  });

  })
  
});