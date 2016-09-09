import angular from 'angular'
import angularResource from 'angular-resource'
import quizzesServiceProvider  from './quizzes.service'

const MODULE_NAME = 'quizzes'

export const quizzesServiceName = 'api'

export default angular
  .module(MODULE_NAME, [
    angularResource
  ])

  .provider(quizzesServiceName, quizzesServiceProvider)

  .component('quizContainer', {
    bindings: {
      questions: '<'
    },
    template: require('./quiz-container.html')
  })

  .name
