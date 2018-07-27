import _ from 'lodash'
import Model from './model'

class Households extends Model {
  toClientRecord(dbRecord) {
    return _.mapKeys(dbRecord, (value, key) => _.camelCase(key))
  }

  /**
   * Lists all households
   *
   * @returns {promise}
   */
  async list() {
    const res = await this.query('SELECT * FROM wedding.guests')
    const guests = _.map(res.rows, this.toClientRecord)
    const householdsMap = _.mapValues(
      _.groupBy(
        guests,
        guest =>
          guest.householdLeaderFirstName + '_' + guest.householdLeaderLastName
      ),
      guests => {
        const slimGuestRecords = _.map(guests, guest => {
          return _.pick(guest, [
            'id',
            'firstName',
            'lastName',
            'mealOption',
            'rsvpStatus',
            'rsvpMessage',
          ])
        })
        return {
          householdLeaderFirstName: guests[0].householdLeaderFirstName,
          householdLeaderLastName: guests[0].householdLeaderLastName,
          guests: slimGuestRecords,
        }
      }
    )
    return _.values(householdsMap)
  }

  /**
   * Saves a household
   *
   * @param {object} household - the household to save
   * @param {string} comments - any user-provided comments
   * @returns {promise}
   */
  async save(household, comments) {
    return this.transaction(async client => {
      const saveGuest = guest => {
        return client.query(
          `
        UPDATE wedding.guests
        SET rsvp_status = $2,
            meal_option = $3,
            rsvp_message = $4
        WHERE id = $1;
        `,
          [guest.id, guest.rsvpStatus, guest.mealOption, comments]
        )
      }

      await Promise.all(household.guests.map(saveGuest))
    })
  }
}

export default new Households()
