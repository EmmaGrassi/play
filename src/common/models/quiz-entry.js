import _ from 'lodash'
import async from 'async'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  QuizEntry.remoteMethod('answers', {
    accepts: [
      {
        arg: 'id',
        type: 'string'
      },
      {
        arg: 'answers',
        type: 'array'
      },
    ]
  })

  QuizEntry.remoteMethod('scoreboard', {
    http: {
      verb: 'get',
      path: '/scoreboard',
    },
    returns: {
      arg: 'scores',
      type: 'array',
    }
  })

  QuizEntry.answers = (id, answers, cb) => {
    QuizEntry.getApp((error, app) => {
      if (error) {
        return cb(error)
      }

      const Option = app.models.Option

      Option.find({
        where: {
          correct: true,
        }
      }, (error, correctOptions) => {
        if (error) {
          return cb(error)
        }

        let score = 0

        _.each(answers, answer => {
          const match = _.find(correctOptions, option => {
            return option.id.toString() === answer.optionId.toString()
          })

          if (match) {
            score++
          }
        })

        QuizEntry.findById(id, (error, quizEntry) => {
          if (error) {
            return cb(error)
          }

          const quizEntryJSON = quizEntry.toJSON()

          quizEntryJSON.score = score

          delete quizEntryJSON.id

          QuizEntry.replaceById(id, quizEntryJSON, (error, doc) => {
            if (error) {
              return cb(error)
            }

            cb(null, doc)
          })
        })
      })
    })
  }

  QuizEntry.scoreboard = cb => {
    QuizEntry.find({}, (error, entries) => {
      if (error) {
        return cb(error)
      }

      // TODO: Just return everything for now.
      /*
      entries = _.map(entries, x => {
        return {
          firstName: x.firstName,
          lastName: x.lastName,
          score: x.score,
        }
      })
      */

      entries = _.groupBy(entries, 'score')

      cb(null, entries)
    })
  }
}
