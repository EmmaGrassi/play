'use strict';

const _ = require('lodash');
const async = require('async');
const log = require('loglevel');

function createAdminUser(app, cb) {
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

function createQuizzes(app, cb) {
  const { Quiz, Question, Option } = app.models;

  // Remove all data.
  async.series([
    (cb) => Quiz.destroyAll(cb),
    (cb) => Question.destroyAll(cb),
    (cb) => Option.destroyAll(cb)
  ], (error) => {
    if (error) {
      return cb(error);
    }

    async.parallel([
      (cb) => {
        Quiz.create({
          subject: 'scala'
        }, (error, quiz) => {
          if (error) {
            return cb(error);
          }

          async.parallel([
            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'Which class is at the root of the Scala class hierarchy?',
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: 'scala.scalaObject',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.anyRef',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.Object',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.Any',
                    correct: false,
                  }
                ], cb);
              });
            },

            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'What is the result of the following?',
                code: 'Some Code'
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: '1',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: '2',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: '3',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: '4',
                    correct: false,
                  }
                ], cb);
              });
            },

            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'ORLY',
                code: 'YARLY'
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: 'A',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: 'B',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'C',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'D',
                    correct: false,
                  }
                ], cb);
              });
            }
          ], (error) => {
            if (error) {
              return cb(error);
            }

            cb();
          });
        });
      },

      (cb) => {
        Quiz.create({
          subject: 'clojure'
        }, (error, quiz) => {
          if (error) {
            return cb(error);
          }

          async.parallel([
            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'Which class is at the root of the Scala class hierarchy?',
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: 'scala.scalaObject',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.anyRef',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.Object',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.Any',
                    correct: false,
                  }
                ], cb);
              });
            },

            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'What is the result of the following?',
                code: 'Some Code'
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: '1',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: '2',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: '3',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: '4',
                    correct: false,
                  }
                ], cb);
              });
            },

            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'ORLY',
                code: 'YARLY'
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: 'A',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: 'B',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'C',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'D',
                    correct: false,
                  }
                ], cb);
              });
            }
          ], (error) => {
            if (error) {
              return cb(error);
            }

            cb();
          });
        });
      },

      (cb) => {
        Quiz.create({
          subject: 'android'
        }, (error, quiz) => {
          if (error) {
            return cb(error);
          }

          async.parallel([
            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'Which class is at the root of the Scala class hierarchy?',
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: 'scala.scalaObject',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.anyRef',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.Object',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.Any',
                    correct: false,
                  }
                ], cb);
              });
            },

            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'Title!',
                question: 'What is the result of the following?',
                code: 'Some Code'
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: '1',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: '2',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: '3',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: '4',
                    correct: false,
                  }
                ], cb);
              });
            },

            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'ORLY',
                code: 'YARLY'
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: 'A',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: 'B',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'C',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'D',
                    correct: false,
                  }
                ], cb);
              });
            }
          ], (error) => {
            if (error) {
              return cb(error);
            }

            cb();
          });
        });
      },

      (cb) => {
        Quiz.create({
          subject: 'javascript'
        }, (error, quiz) => {
          if (error) {
            return cb(error);
          }

          async.parallel([
            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'Which class is at the root of the Scala class hierarchy?',
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: 'scala.scalaObject',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.anyRef',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.Object',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.Any',
                    correct: false,
                  }
                ], cb);
              });
            },

            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'What is the result of the following?',
                code: 'Some Code'
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: '1',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: '2',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: '3',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: '4',
                    correct: false,
                  }
                ], cb);
              });
            },

            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'ORLY',
                code: 'YARLY'
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: 'A',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: 'B',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'C',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'D',
                    correct: false,
                  }
                ], cb);
              });
            }
          ], (error) => {
            if (error) {
              return cb(error);
            }

            cb();
          });
        });
      },

      (cb) => {
        Quiz.create({
          subject: 'java'
        }, (error, quiz) => {
          if (error) {
            return cb(error);
          }

          async.parallel([
            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'Which class is at the root of the Scala class hierarchy?',
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: 'scala.scalaObject',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.anyRef',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.Object',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'scala.Any',
                    correct: false,
                  }
                ], cb);
              });
            },

            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'What is the result of the following?',
                code: 'Some Code'
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: '1',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: '2',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: '3',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: '4',
                    correct: false,
                  }
                ], cb);
              });
            },

            (cb) => {
              Question.create({
                quizId: quiz.id,
                title: 'A title',
                question: 'ORLY',
                code: 'YARLY'
              }, (error, question) => {
                if (error) {
                  return cb(error);
                }

                Option.create([
                  {
                    questionId: question.id,
                    value: 'A',
                    correct: true,
                  },
                  {
                    questionId: question.id,
                    value: 'B',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'C',
                    correct: false,
                  },
                  {
                    questionId: question.id,
                    value: 'D',
                    correct: false,
                  }
                ], cb);
              });
            }
          ], (error) => {
            if (error) {
              return cb(error);
            }

            cb();
          });
        });
      }
    ], cb);
  });
}

module.exports = function(app, cb) {
  createAdminUser(app, function(error, user) {
    if (error) {
      return cb(error);
    }

    createAdminRole(app, function(error, role) {
      if (error) {
        return cb(error);
      }

      createAdminRolemapping(app, user, role, function(error, rolemapping) {
        if (error) {
          return cb(error);
        }

        createAdminACL(app, user, role, rolemapping, function(error, acl) {
          if (error) {
            return cb(error);
          }

          createQuizzes(app, cb);
        });
      });
    });
  });
};
