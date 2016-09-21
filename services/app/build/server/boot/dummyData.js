'use strict';

var _ = require('lodash');
var async = require('async');
var log = require('loglevel');

function createAdminUser(app, cb) {
  var user = app.models.user;

  user.destroyAll(function (error) {

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
  var Role = app.models.Role;

  Role.destroyAll(function (error) {
    if (error) {
      return cb(error);
    }

    Role.create({
      name: 'admin'
    }, cb);
  });
}

function createAdminRolemapping(app, user, role, cb) {
  var RoleMapping = app.models.RoleMapping;

  RoleMapping.destroyAll(function (error) {
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
  var ACL = app.models.ACL;

  ACL.destroyAll(function (error) {
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

function createQuizzes(app, cb) {
  var _app$models = app.models;
  var Quiz = _app$models.Quiz;
  var Question = _app$models.Question;
  var Option = _app$models.Option;

  // Remove all data.

  async.series([function (cb) {
    return Quiz.destroyAll(cb);
  }, function (cb) {
    return Question.destroyAll(cb);
  }, function (cb) {
    return Option.destroyAll(cb);
  }], function (error) {
    if (error) {
      return cb(error);
    }

    async.parallel([function (cb) {
      Quiz.create({
        subject: 'scala'
      }, function (error, quiz) {
        if (error) {
          return cb(error);
        }

        async.parallel([function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'Which class is at the root of the Scala class hierarchy?'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: 'scala.scalaObject',
              correct: true
            }, {
              questionId: question.id,
              value: 'scala.anyRef',
              correct: false
            }, {
              questionId: question.id,
              value: 'scala.Object',
              correct: false
            }, {
              questionId: question.id,
              value: 'scala.Any',
              correct: false
            }], cb);
          });
        }, function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'What is the result of the following?',
            code: 'Some Code'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: '1',
              correct: true
            }, {
              questionId: question.id,
              value: '2',
              correct: false
            }, {
              questionId: question.id,
              value: '3',
              correct: false
            }, {
              questionId: question.id,
              value: '4',
              correct: false
            }], cb);
          });
        }, function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'ORLY',
            code: 'YARLY'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: 'A',
              correct: true
            }, {
              questionId: question.id,
              value: 'B',
              correct: false
            }, {
              questionId: question.id,
              value: 'C',
              correct: false
            }, {
              questionId: question.id,
              value: 'D',
              correct: false
            }], cb);
          });
        }], function (error) {
          if (error) {
            return cb(error);
          }

          cb();
        });
      });
    }, function (cb) {
      Quiz.create({
        subject: 'clojure'
      }, function (error, quiz) {
        if (error) {
          return cb(error);
        }

        async.parallel([function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'Which class is at the root of the Scala class hierarchy?'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: 'scala.scalaObject',
              correct: true
            }, {
              questionId: question.id,
              value: 'scala.anyRef',
              correct: false
            }, {
              questionId: question.id,
              value: 'scala.Object',
              correct: false
            }, {
              questionId: question.id,
              value: 'scala.Any',
              correct: false
            }], cb);
          });
        }, function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'What is the result of the following?',
            code: 'Some Code'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: '1',
              correct: true
            }, {
              questionId: question.id,
              value: '2',
              correct: false
            }, {
              questionId: question.id,
              value: '3',
              correct: false
            }, {
              questionId: question.id,
              value: '4',
              correct: false
            }], cb);
          });
        }, function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'ORLY',
            code: 'YARLY'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: 'A',
              correct: true
            }, {
              questionId: question.id,
              value: 'B',
              correct: false
            }, {
              questionId: question.id,
              value: 'C',
              correct: false
            }, {
              questionId: question.id,
              value: 'D',
              correct: false
            }], cb);
          });
        }], function (error) {
          if (error) {
            return cb(error);
          }

          cb();
        });
      });
    }, function (cb) {
      Quiz.create({
        subject: 'android'
      }, function (error, quiz) {
        if (error) {
          return cb(error);
        }

        async.parallel([function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'Which class is at the root of the Scala class hierarchy?'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: 'scala.scalaObject',
              correct: true
            }, {
              questionId: question.id,
              value: 'scala.anyRef',
              correct: false
            }, {
              questionId: question.id,
              value: 'scala.Object',
              correct: false
            }, {
              questionId: question.id,
              value: 'scala.Any',
              correct: false
            }], cb);
          });
        }, function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'Title!',
            question: 'What is the result of the following?',
            code: 'Some Code'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: '1',
              correct: true
            }, {
              questionId: question.id,
              value: '2',
              correct: false
            }, {
              questionId: question.id,
              value: '3',
              correct: false
            }, {
              questionId: question.id,
              value: '4',
              correct: false
            }], cb);
          });
        }, function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'ORLY',
            code: 'YARLY'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: 'A',
              correct: true
            }, {
              questionId: question.id,
              value: 'B',
              correct: false
            }, {
              questionId: question.id,
              value: 'C',
              correct: false
            }, {
              questionId: question.id,
              value: 'D',
              correct: false
            }], cb);
          });
        }], function (error) {
          if (error) {
            return cb(error);
          }

          cb();
        });
      });
    }, function (cb) {
      Quiz.create({
        subject: 'javascript'
      }, function (error, quiz) {
        if (error) {
          return cb(error);
        }

        async.parallel([function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'Which class is at the root of the Scala class hierarchy?'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: 'scala.scalaObject',
              correct: true
            }, {
              questionId: question.id,
              value: 'scala.anyRef',
              correct: false
            }, {
              questionId: question.id,
              value: 'scala.Object',
              correct: false
            }, {
              questionId: question.id,
              value: 'scala.Any',
              correct: false
            }], cb);
          });
        }, function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'What is the result of the following?',
            code: 'Some Code'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: '1',
              correct: true
            }, {
              questionId: question.id,
              value: '2',
              correct: false
            }, {
              questionId: question.id,
              value: '3',
              correct: false
            }, {
              questionId: question.id,
              value: '4',
              correct: false
            }], cb);
          });
        }, function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'ORLY',
            code: 'YARLY'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: 'A',
              correct: true
            }, {
              questionId: question.id,
              value: 'B',
              correct: false
            }, {
              questionId: question.id,
              value: 'C',
              correct: false
            }, {
              questionId: question.id,
              value: 'D',
              correct: false
            }], cb);
          });
        }], function (error) {
          if (error) {
            return cb(error);
          }

          cb();
        });
      });
    }, function (cb) {
      Quiz.create({
        subject: 'java'
      }, function (error, quiz) {
        if (error) {
          return cb(error);
        }

        async.parallel([function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'Which class is at the root of the Scala class hierarchy?'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: 'scala.scalaObject',
              correct: true
            }, {
              questionId: question.id,
              value: 'scala.anyRef',
              correct: false
            }, {
              questionId: question.id,
              value: 'scala.Object',
              correct: false
            }, {
              questionId: question.id,
              value: 'scala.Any',
              correct: false
            }], cb);
          });
        }, function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'What is the result of the following?',
            code: 'Some Code'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: '1',
              correct: true
            }, {
              questionId: question.id,
              value: '2',
              correct: false
            }, {
              questionId: question.id,
              value: '3',
              correct: false
            }, {
              questionId: question.id,
              value: '4',
              correct: false
            }], cb);
          });
        }, function (cb) {
          Question.create({
            quizId: quiz.id,
            title: 'A title',
            question: 'ORLY',
            code: 'YARLY'
          }, function (error, question) {
            if (error) {
              return cb(error);
            }

            Option.create([{
              questionId: question.id,
              value: 'A',
              correct: true
            }, {
              questionId: question.id,
              value: 'B',
              correct: false
            }, {
              questionId: question.id,
              value: 'C',
              correct: false
            }, {
              questionId: question.id,
              value: 'D',
              correct: false
            }], cb);
          });
        }], function (error) {
          if (error) {
            return cb(error);
          }

          cb();
        });
      });
    }], cb);
  });
}

module.exports = function (app, cb) {
  createAdminUser(app, function (error, user) {
    if (error) {
      return cb(error);
    }

    createAdminRole(app, function (error, role) {
      if (error) {
        return cb(error);
      }

      createAdminRolemapping(app, user, role, function (error, rolemapping) {
        if (error) {
          return cb(error);
        }

        createAdminACL(app, user, role, rolemapping, function (error, acl) {
          if (error) {
            return cb(error);
          }

          createQuizzes(app, cb);
        });
      });
    });
  });
};
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createAdminUser, 'createAdminUser', '/service/src/server/boot/dummyData.js');

  __REACT_HOT_LOADER__.register(createAdminRole, 'createAdminRole', '/service/src/server/boot/dummyData.js');

  __REACT_HOT_LOADER__.register(createAdminRolemapping, 'createAdminRolemapping', '/service/src/server/boot/dummyData.js');

  __REACT_HOT_LOADER__.register(createAdminACL, 'createAdminACL', '/service/src/server/boot/dummyData.js');

  __REACT_HOT_LOADER__.register(createQuizzes, 'createQuizzes', '/service/src/server/boot/dummyData.js');
})();

;