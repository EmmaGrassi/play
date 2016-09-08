import angular from 'angular'
import DetailsFormModule from '../details-form'

const MODULE_NAME = 'quizApp'

export default angular
  .module(MODULE_NAME, [
    DetailsFormModule
  ])

  .component(MODULE_NAME, {
    template: `
      <details-form></details-form>
    `
  })

  .name
