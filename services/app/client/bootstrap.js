import angular from 'angular';

import QuizAppModule from './scripts/quiz-app'
import './styles/styles.scss'

angular.bootstrap(document.body, [
  QuizAppModule
], { strictDi: true })
