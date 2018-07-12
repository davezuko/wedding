import firebase from '../resources/firebase'

export function list() {
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
