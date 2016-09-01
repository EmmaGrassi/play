'use strict';

//const _ = require('lodash');
const log = require('loglevel');

function createAdminUser(app, cb) {
  log.debug('boot/dummyData/createAdminUser');

  const user = app.models.user;

  user.destroyAll(function(error){

    if (error) {
      return cb(error);
    }

    user.create({
      username: 'admin',
      email: 'admin@test.com',
      password: 'test',
      firstName: 'Admin',
      lastName: 'Admin',
      twitter: 'SomeTwitterHandle',
      github: 'MyGithubProfile'
    }, cb);
  });
}

function createAdminRole(app, cb) {
  log.debug('boot/dummyData/createAdminRole');

  const Role = app.models.Role;

  Role.destroyAll((error) => {
    if (error) {
      return cb(error);
    }

    Role.create({
      name: 'admin'
    }, cb);
  });
}

function createAdminRolemapping(app, user, role, cb) {
  log.debug('boot/dummyData/createAdminRolemapping');

  const RoleMapping = app.models.RoleMapping;

  RoleMapping.destroyAll((error) => {
    if (error) {
      return cb(error);
    }

    RoleMapping.create({
      principalId: user.id,
      principalType: RoleMapping.USER,
      roleId: role.id
    }, cb);
  });
}

function createAdminACL(app, user, role, rolemapping, cb) {
  log.debug('boot/dummyData/createAdminACL');

  const ACL = app.models.ACL;

  ACL.destroyAll(function(error){
    if (error) {
      return cb(error);
    }

    ACL.create({
      model: 'user',
      property: '*',
      accessType: '*',
      permission: 'ALLOW',
      principalType: 'ROLE',
      principalId: 'admin'
    }, cb);
  });
}

function createQuestions(app, quiz, cb) {
  log.debug('boot/dummyData/createQuestions');

  const Question = app.models.Question;

  Question.destroyAll((error) => {
    if (error) {
      return cb(error);
    }

    Question.create({
      date: new Date()
    }, cb);
  });
}

function createQuiz(app, cb) {
  log.debug('boot/dummyData/createQuiz');

  const Quiz = app.models.Quiz;

  Quiz.destroyAll((error) => {
    if (error) {
      return cb(error);
    }

    Quiz.create({
      date: new Date()
    }, cb);
  });
}

module.exports = function(app, cb) {
  log.debug('boot/dummyData');

  createAdminUser(app, function(error, user){
    if (error) {
      return cb(error);
    }

    createAdminRole(app, function(error, role){
      if (error) {
        return cb(error);
      }

      createAdminRolemapping(app, user, role, function(error, rolemapping){
        if (error) {
          return cb(error);
        }

        createAdminACL(app, user, role, rolemapping, function(error, acl){
          if (error) {
            return cb(error);
          }

          cb();
          //createQuiz(app, function(error, quiz) {
          //  if (error) {
          //    return cb(error);
          //  }

          //  createQuestions(app, quiz, function(error, questions) {
          //    if (error) {
          //      return cb(error);
          //    }

          //    cb();
          //  });
          //});
        });
      });
    });
  });
};
