import _ from 'lodash'
import async from 'async'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

import app from '../../server/server'

// - Group by email.
// - Sort each list by start time and return the highest startTime.
// - Cast back to an array of unique per email entries.
function filterEntries(entries) {
  return _(entries)
    .groupBy('email')
    .map(as => {
      return _(as)
        .sortBy(as, (a) => {
          return new Date(a.startTime).valueOf()
        })
        .head()
    })
    .value()
}

module.exports = function(QuizEntry) {
  QuizEntry.validatesLengthOf('firstName', {
    min: 2,
    message: 'First name must be longer then 2 charcters.'
  })

  QuizEntry.validatesLengthOf('lastName', {
    min: 2,
    message: 'Last name must be longer then 2 charcters.'
  })

  QuizEntry.validatesFormatOf('email', {
    with: EMAIL_REGEX,
    message: 'Please enter a valid email address',
  })

  console.log('BAAA', _.keys(QuizEntry))

  function getEntryScores(entries, cb) {
    async.parallel(_.map(entries, entry => (cb) => {
      QuizEntryAnswer.find({ where: { quizEntryId: entry.id }, }, (error, answers) => {
        if (error) {
          return cb(error)
        }

        async.parallel(_.map(answers, answer => (cb) => {
          async.parallel([
            (cb) => Question.find({ where: { id: answer.questionId }, }, cb),
            (cb) => Option.find({ where: { id: answer.optionId }, }, cb),
          ], cb)
        }), (error, results) => {
          if (error) {
            return cb(error)
          }

          cb(null, results)
        })
      })
    }), cb)
  }



  QuizEntry.scoreboard = cb => {
    QuizEntry
      .find({
        include: [
          {
            relation: 'answers',
            scope: {
              include: [
                'option',
                'question'
              ]
            }
          }
        ]
      }, (error, entries) => {
        if (error) {
          return cb(error)
        }

        cb(null, entries)

        //getEntryScores(filterEntries(entries), cb)
      })
  }

  QuizEntry.remoteMethod('scoreboard', {
    http: {
      verb: 'get',
      path: '/scoreboard',
    },
    returns: {
      arg: 'scores',
      type: 'object',
    }
  })
}
