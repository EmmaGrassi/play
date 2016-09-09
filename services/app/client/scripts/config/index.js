import angular from 'angular'

const MODULE_NAME = 'config'

export default angular
  .module(MODULE_NAME, [])

  .constant('APP_CONFIG', {
    endpoints: {
      quizEntries: '/api/QuizEntries',
      quizzes: '/api/Quizzes/:id',
      quizzesQuestions: '/api/Quizzes/:id/questions'
    }
  })

  .name
