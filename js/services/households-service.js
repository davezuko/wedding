import firebase from '../resources/firebase'

export function list() {
  if (process.env.NODE_ENV === 'development') {
    const households = require('../../_tmp/mock-data.json')
    return Promise.resolve(Object.keys(households).map(id => households[id]))
  }

  return firebase
    .database()
    .ref('/households')
    .once('value')
    .then(snapshot => {
      const households = snapshot.val()
      return Object.keys(households).map(id => households[id])
    })
}

export function put(id, value) {
  return firebase
    .database()
    .ref(`/households/${id}`)
    .set(value)
}
