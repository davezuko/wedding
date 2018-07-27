export function fromGoogleSheets(record) {
  return {
    first_name: record['First Name'],
    last_name: record['Last Name'] || '',
    address: null,
    phone: null,
    email: null,
    notes: null,
    gift_received: null,
    thank_you_sent: null,
    meal_option: null,
    rsvp_status: null,
    rsvp_message: null,
    invitation_sent: record['Invitation Done?'] === 'Yes',
    household_leader_first_name: record['Household Leader'].split(' ')[0],
    household_leader_last_name: record['Household Leader'].split(' ')[1],
  }
}

export function fromTheKnot(record) {
  return {
    first_name: record['First Name'],
    last_name: record['Last Name'],
    address: record['Address'] || null,
    phone: record['Phone'] || null,
    email: record['Email'] || null,
    notes: record['Our Wedding - Notes'] || null,
    gift_received: record['Our Wedding - Gift Received'] || false,
    thank_you_sent: record['Our Wedding - Thank You Sent'] === 'Sent',
    meal_option: record['Our Wedding - Meal Option'] || null,
    rsvp_status:
      record['Our Wedding - RSVP'] === 'No response'
        ? null
        : record['Our Wedding - RSVP'] === 'Accepted',
    rsvp_message: record['RSVP Message'] || null,
    invitation_sent: record['Our Wedding - Invited'] === 'Sent',
    household_leader_first_name: record['Household Leader First Name'],
    household_leader_last_name: record['Household Leader Last Name'],
  }
}

export function toTheKnot(record) {
  return {
    'First Name': record.first_name,
    'Last Name': record.last_name,
    Address: record.address || '',
    Phone: record.phone || '',
    Email: record.email || '',
    'Our Wedding - Notes': record.notes || '',
    'Our Wedding - Gift Received': record.gift_received || '',
    'Our Wedding - Thank You Sent': record.thank_you_sent ? 'Sent' : 'Not Sent',
    'Our Wedding - Meal Option': record.meal_option || '',
    'Our Wedding - RSVP':
      record.rsvp_status === true
        ? 'Accepted'
        : record.rsvp_status === false
          ? 'Declined'
          : 'No response',
    'RSVP Message': record.rsvp_message || '',
    'Our Wedding - Invited': record.invitation_sent ? 'Sent' : 'Not Sent',
    'Household Leader First Name': record.household_leader_first_name,
    'Household Leader Last Name': record.household_leader_last_name,
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

const SAMPLE_DB_RECORD = {
  first_name: 'Fake First Name',
  last_name: 'Fake Last Name',
  address: null,
  phone: null,
  email: null,
  notes: null,
  gift_received: false,
  thank_you_sent: false,
  meal_option: null,
  rsvp_status: null,
  rsvp_message: null,
  invitation_sent: false,
  household_leader_first_name: 'Fake Household First Name',
  household_leader_last_name: 'Fake Household Last Name',
}

// Ensure that all data is preserved when going from The Knot -> Us and back
// console.log(toTheKnot(fromTheKnot(SAMPLE_KNOT_RECORD)))
assert.deepEqual(SAMPLE_KNOT_RECORD, toTheKnot(fromTheKnot(SAMPLE_KNOT_RECORD)))

// Ensure that all data is preserved when going from Us -> The Knot and back
// console.log(fromTheKnot(toTheKnot(SAMPLE_DB_RECORD)))
assert.deepEqual(SAMPLE_DB_RECORD, fromTheKnot(toTheKnot(SAMPLE_DB_RECORD)))
