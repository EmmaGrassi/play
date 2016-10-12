import I from 'seamless-immutable'
import * as log from 'loglevel'

// TODO: Remove magic number and retrieve it from backend?
const TOTAL_TIME = 10000 // 2 * 60 * 1000 // two minutes in milliseconds

// This reducer keeps application initialization state.
const initialState = I({
  id: null,
  firstName: null,
  email: null,
  github: null,

  contact: false,

  into: {
    java: null,
    node: null,
    python: null,
    ruby: null,
    scala: null,
  },

  lastName: null,
  startTime: null,
  subject: null,

  started: false,
  ended: false,

  answers: [],

  unansweredQuestions: [],
  currentQuestion: null,
})

export default (state = initialState, action) => {
  switch (action.type) {
    // When the quiz is fetched, set the questions to be answered in the quizentry.
    case 'Quiz:get:success':
      return state
        .merge({
          unansweredQuestions: action.payload.questions
        })

    case 'QuizEntry:set':
      return state.merge(action.payload)

    case 'QuizEntry:start':
      return state.merge({
        started: true
      })

    case 'QuizEntry:end':
      return state.merge({
        ended: true
      })

    case 'QuizEntry:answerQuizEntryQuestion':
      const index = action.payload
      const {
        currentQuestion,
        answers,
      } = state

      const chosenOption = currentQuestion.options[index]

      const newAnswer = {
        questionId: currentQuestion.id,
        optionId: chosenOption.id,
      }

      // TODO: Better way?
      return state
        .set('answers', answers.asMutable().concat([newAnswer]))

    case 'QuizEntry:setNewQuizEntryQuestion':
      const unansweredQuestions = state.unansweredQuestions

      // Stop the quiz.
      if (!unansweredQuestions.length) {
        return state
          .set('ended', true)
      }

      const newQuestion = unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)]

      state = state.set('unansweredQuestions', unansweredQuestions
        .filter(x => x.id !== newQuestion.id))

      state = state.set('currentQuestion', newQuestion)

      return state

    case 'QuizEntry:tick':
      let time = state.timeLeft - action.payload.reductionAmount

      let update = {}

      // Make sure the time will never go below 0
      if (time < 0) {
        update.timeLeft = 0
        update.ended = true
      } else {
        update.timeLeft = time
      }

      return state
        .merge(update)

    default:
      return state
  }
}
