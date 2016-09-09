import angular from 'angular'
import ConfigModule from '../config'
import DetailsFormModule from '../details-form'

import QuizzesModule, { quizzesServiceName } from '../quizzes'

const MODULE_NAME = 'quizAppModule'
const componentName = 'quizApp'

export default angular
  .module(MODULE_NAME, [
    ConfigModule,
    DetailsFormModule,
    QuizzesModule
  ])

  .config([
    'APP_CONFIG',
    quizzesServiceName + 'Provider',
    function (APP_CONFIG, quizzesProvider) {
      quizzesProvider.setEndpoints(APP_CONFIG.endpoints)
    }
  ])

  .component(componentName, {
    template: `
      <details-form on-save="$ctrl.questions = questions" ng-if="!$ctrl.questions"></details-form>
      <quiz-container questions="$ctrl.questions" ng-if="$ctrl.questions"></quiz-container>
    `
  })

  .name
