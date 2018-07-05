import firebase from '../resources/firebase'

const households = firebase.database().ref('/households')

function parseHouseholds(snapshot) {
  const value = snapshot.val()
  return Object.keys(value).map(id => {
    return Object.assign({id}, value[id])
  })
}

export function listHouseholds() {
  return households.once('value').then(parseHouseholds)
}

export function subscribeToHouseholds(cb) {
  households.on('value', snapshot => {
    cb(parseHouseholds(snapshot))
  })
}

export function saveHousehold(id, value) {
  return firebase
    .database()
    .ref(`/households/${id}`)
    .set(value)
}
