import _ from 'lodash'
import assert from 'assert'
import {Pool, Client} from 'pg'

function toClientRecord(record) {
  return _.mapKeys(record, (value, key) => _.camelCase(key))
}

const pool = new Pool()

/** Lists all households along with their guests */
export const listHouseholds = async () => {
  const res = await pool.query('SELECT * FROM wedding.guests')
  const guests = _.map(res.rows, toClientRecord)
  const householdsMap = _.mapValues(
    _.groupBy(
      guests,
      guest =>
        guest.householdLeaderFirstName + '_' + guest.householdLeaderLastName
    ),
    guests => {
      return {
        householdLeaderFirstName: guests[0].householdLeaderFirstName,
        householdLeaderLastName: guests[0].householdLeaderLastName,
        guests,
      }
    }
  )
  return _.values(householdsMap)
}

/**
 * Finds all members of a household for a given guest (first name + last name)
 */
export const findHousehold = async (firstName, lastName) => {
  const res = await pool.query(
    'SELECT * FROM wedding.guests WHERE first_name LIKE $1 AND last_name LIKE $2;',
    [firstName, lastName]
  )

  assert.equal(res.rows.length, 1)

  const guest = res.rows[0]
  const household = await pool.query(
    `
    SELECT * FROM wedding.guests
    WHERE household_leader_first_name LIKE $1
    AND household_leader_last_name LIKE $2;
  `,
    [guest.household_leader_first_name, guest.household_leader_last_name]
  )

  return _.map(household.rows, toClientRecord)
}
