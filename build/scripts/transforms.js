export function theKnotToFirebaseRecord(record) {
  return {
    firstName: record['First Name'],
    lastName: record['Last Name'],
    address: record['Address'] || null,
    phone: record['Phone'] || null,
    email: record['Email'] || null,
    notes: record['Our Wedding - Notes'] || null,
    giftReceived: record['Our Wedding - Gift Received'] || false,
    thankYouStatus: record['Our Wedding - Thank You Sent'],
    mealOption: record['Our Wedding - Meal Option'] || null,
    rsvpStatus: record['Our Wedding - RSVP'] || null,
    rsvpMessage: record['RSVP Message'] || null,
    invitationStatus: record['Our Wedding - Invited'],
    householdLeaderFirstName: record['Household Leader First Name'],
    householdLeaderLastName: record['Household Leader Last Name'],
  }
}

export function firebaseToTheKnotRecord(record) {
  return {
    'First Name': record.firstName,
    'Last Name': record.lastName,
    Address: record.address || '',
    Phone: record.phone || '',
    Email: record.email || '',
    'Our Wedding - Notes': record.notes || '',
    'Our Wedding - Gift Received': record.giftReceived || '',
    'Our Wedding - Thank You Sent': record.thankYouStatus,
    'Our Wedding - Meal Option': record.mealOption || '',
    'Our Wedding - RSVP': record.rsvpStatus,
    'RSVP Message': record.rsvpMessage || '',
    'Our Wedding - Invited': record.invitationStatus,
    'Household Leader First Name': record.householdLeaderFirstName,
    'Household Leader Last Name': record.householdLeaderLastName,
  }
}

// Tests
// ------------------------------------
const assert = require('assert')

const SAMPLE_KNOT_RECORD = {
  'First Name': 'Fake First Name',
  'Last Name': 'Fake Last Name',
  'Household Leader First Name': 'Fake Household First Name',
  'Household Leader Last Name': 'Fake Household Last Name',
  Address: '',
  Phone: '',
  Email: '',
  'Our Wedding - Invited': 'Not Sent',
  'Our Wedding - RSVP': 'No response',
  'Our Wedding - Meal Option': '',
  'Our Wedding - Thank You Sent': 'Not Sent',
  'Our Wedding - Gift Received': '',
  'Our Wedding - Notes': '',
  'RSVP Message': '',
}

const SAMPLE_FIREBASE_RECORD = {
  firstName: 'Fake First Name',
  lastName: 'Fake Last Name',
  address: null,
  phone: null,
  email: null,
  notes: null,
  giftReceived: false,
  thankYouStatus: 'Not Sent',
  mealOption: null,
  rsvpStatus: 'No response',
  rsvpMessage: null,
  invitationStatus: 'Not Sent',
  householdLeaderFirstName: 'Fake Household First Name',
  householdLeaderLastName: 'Fake Household Last Name',
}

// Ensure that all data is preserved when going from The Knot -> Firebase and back
assert.deepEqual(
  SAMPLE_KNOT_RECORD,
  firebaseToTheKnotRecord(theKnotToFirebaseRecord(SAMPLE_KNOT_RECORD))
)

// Ensure that all data is preserved when going from Firebase -> The Knot and back
assert.deepEqual(
  SAMPLE_FIREBASE_RECORD,
  theKnotToFirebaseRecord(firebaseToTheKnotRecord(SAMPLE_FIREBASE_RECORD))
)
