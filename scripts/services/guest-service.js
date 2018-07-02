import firebase from './firebase'

function parseHouseholds(snapshot) {
  const value = snapshot.val()
  return Object.keys(value).map(id => {
    return Object.assign({id}, value[id])
  })
}

export function listHouseholds() {
  return firebase
    .database()
    .ref('/')
    .once('value')
    .then(parseHouseholds)
}

export function subscribeToHouseholds(cb) {
  firebase
    .database()
    .ref('/households')
    .on('value', snapshot => {
      cb(parseHouseholds(snapshot))
    })
}
