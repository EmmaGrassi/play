export default function APIProvider() {
  let config = {
    endpoints: {}
  }

  return {
    setEndpoints(endpoints) {
      Object.assign(config.endpoints, endpoints)
    },

    $get: ['$resource', function($resource) {
      return {
        entry: $resource(config.endpoints.quizEntries),
        quizzes: $resource(config.endpoints.quizzes, { id: '@id' }),
        quizzesQuestions: $resource(config.endpoints.quizzesQuestions, { id: '@id' }),
      }
    }]
  }
}
