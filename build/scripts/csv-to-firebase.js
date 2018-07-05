import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import parseCSV from 'csv-parse/lib/sync'
import firebase from '../../js/resources/firebase'
import {theKnotToFirebaseRecord} from './transforms'

const [, , csvFile] = process.argv

if (!csvFile) {
  throw new Error(
    'An input CSV file is required: yarn csv-to-firebase {path-to-csv-file}'
  )
}

const guests = parseCSV(fs.readFileSync(csvFile, 'utf8'), {
  columns: true,
}).map(theKnotToFirebaseRecord)

const guestsByHousehold = _.groupBy(guests, guest => {
  return guest.householdLeaderFirstName + '_' + guest.householdLeaderLastName
})

const households = _.mapValues(guestsByHousehold, guests => {
  return {
    guests,
  }
})

firebase
  .database()
  .ref('/')
  .set({households})
  .then(() => {
    console.log('OK')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
