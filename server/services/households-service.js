import assert from 'assert'
import {Pool, Client} from 'pg'

const pool = new Pool()

export const list = async () => {
  const res = await pool.query('SELECT COUNT(*) FROM wedding.guests')
}

export const findHousehold = async (firstName, lastName) => {
  const res = await pool.query(
    'SELECT * FROM wedding.guests WHERE first_name LIKE $1 AND last_name LIKE $2;',
    [firstName, lastName]
  )

  assert.equal(res.rows.length, 1)
  const guest = res.rows[0]

  const household = await pool.query(
    'SELECT * FROM wedding.guests WHERE household_leader_first_name LIKE $1 AND household_leader_last_name LIKE $2;',
    [guest.household_leader_first_name, guest.household_leader_last_name]
  )

  return household.rows
}

findHousehold('Mark', 'Kutcher').then(console.log)
