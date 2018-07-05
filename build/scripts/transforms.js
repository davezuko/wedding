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
    'Our Wedding - Gift Received': record.giftReceived,
    'Our Wedding - Thank You Sent': record.thankYouStatus,
    'Our Wedding - Meal Option': record.mealOption,
    'Our Wedding - RSVP': record.rsvpStatus,
    'RSVP Message': record.rsvpMessage,
    'Our Wedding - Invited': record.invitationStatus,
    'Household Leader First Name': record.householdLeaderFirstName,
    'Household Leader Last Name': record.householdLeaderLastName,
  }
}
