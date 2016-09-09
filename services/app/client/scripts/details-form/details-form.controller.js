export default function DetailsFormController(api) {
  window.api = api
  console.log('=== thomas')

  // TODO: remove test data
  this.form = {
    firstName: 'Thomas',
    lastName: 'Mann',
    email: 'thomas@mann',
    twitter: '@thomas',
    interests: ['cljs']
  }
  this.tos = true

  // Load list of available quizzes
  api.quizzes.query().$promise
    .then(data => this.quizzes = data)

  // Save new entry, load quiz details and questions
  this.save = function() {
    api.entry
      .save(this.form).$promise
      .then(() => loadQuestions(this.form.quizId))
      .then(questions => this.onSave({ questions }))
      .catch(error => {
        this.error = 'Something went wrong.'
      })
  }

  function loadQuestions(quizId) {
    return api.quizzesQuestions.query({ id: quizId }).$promise
  }

}
