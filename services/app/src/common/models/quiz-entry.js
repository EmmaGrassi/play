import _ from 'lodash'
import async from 'async'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  function getQuizEntries(cb) {
    QuizEntry.find({
      include: [
        {
          relation: 'answers',
          scope: {
            include: [
              {
                relation: 'option',
                scope: {
                  fields: [ 'correct' ],
                  where: {
                    correct: true
                  }
                }
              },
            ],
          },
        },
      ]
    }, cb)
  }

  QuizEntry.scoreboard = cb => {
    getQuizEntries((error, entries) => {
      if (error) {
        return cb(error)
      }

      console.log(JSON.stringify(entries.map(x => x.toJSON())))

      /*
      let filtered = filterEntries(entries)

      filtered = _.map(filtered, entry => {
        let score = 0

        _.each(entry.answers, answer => {
          console.log('answer', answer)

          if (answer.option.correct) {
            score++
          }
        })

        entry.score = score

        return entry
      })

      const grouped = _.groupBy(filtered, 'score')
      */

      cb(null, entries)
    })
  }

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
}
