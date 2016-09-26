import _ from 'lodash'

import jsonPostRequest from './jsonPostRequest'

// Transform `{ intoX: true, intoY: false, ... }` into `{ into: { x: true, y: false },  ... }`
function transformInto(data) {
  const into = {}
  _(data)
    .keys()
    .filter(key => key.startsWith('into'))
    .map(key => {
      const finalKey = key
        .replace('into', '')
        .toLowerCase()

      const value = data[key]

      delete data[key]

      return [ finalKey, value ]
    })
    .each(kv => {
      into[kv[0]] = kv[1]
    })
  data.into = into
}

export default async (data) => {
  transformInto(data)

  data.email = 'TESTING_FALSE_EMAIL_VALUE'

  return jsonPostRequest('/api/QuizEntries', data)
}
