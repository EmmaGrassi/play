import angular from 'angular'
import angularMessages from 'angular-messages'

import detailsFormController from './details-form.controller'
import { quizzesServiceName } from '../quizzes'


const MODULE_NAME = 'detailsFormModule'
const componentName = 'detailsForm'
const controllerName = `${MODULE_NAME}:controller`

export default angular
  .module(MODULE_NAME, [
    angularMessages
  ])

  .controller(controllerName, [
    quizzesServiceName,
    detailsFormController
  ])

  .component(componentName, {
    bindings: {
      onSave: '&'
    },
    template: require('./details-form.component.html'),
    controller: controllerName
  })

  .name
