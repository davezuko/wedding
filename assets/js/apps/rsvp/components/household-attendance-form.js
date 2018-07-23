import _ from 'lodash'
import {h, Component} from 'preact'
import cx from 'classnames'
import * as HouseholdsService from '../../../services/households-service'

const DINNER_OPTIONS = ['Steak', 'Salmon', 'Vegetarian']

const RSVPStatusField = ({onChange, value}) => (
  <div className="rsvp-status-field">
    <button
      type="button"
      className={cx('btn btn-block mr-2', {
        active: value === 'Accepted',
        'btn-outline-primary': value === 'Accepted',
        'btn-outline-secondary': value !== 'Accepted',
      })}
      onClick={() => onChange('Accepted')}
    >
      Yes
    </button>
    <button
      type="button"
      className={cx('btn btn-outline-secondary btn-block mt-0', {
        active: value === 'Declined',
      })}
      onClick={() => onChange('Declined')}
    >
      No
    </button>
  </div>
)

class HouseholdAttendanceForm extends Component {
  state = {
    rsvpMessage: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.props.household)
  }

  handleRSVPStatusChange = (guest, status) => {
    guest.rsvpStatus = guest.rsvpStatus === status ? null : status
    this.forceUpdate()
  }

  handleMealChange = (guest, meal) => {
    guest.mealOption = meal || null
    this.forceUpdate()
  }

  renderGuestField = guest => {
    const isAttending = guest.rsvpStatus === 'Accepted'

    return (
      <li key={guest.id} className="list-group-item guest-rsvp-fieldset">
        <div className="row">
          <div className="col col-sm-3">
            <RSVPStatusField
              value={guest.rsvpStatus}
              onChange={status => this.handleRSVPStatusChange(guest, status)}
            />
          </div>
          <div className="col">
            {guest.firstName} {guest.lastName}
          </div>
          <div className="col-12 col-sm-4">
            {isAttending && (
              <div className="guest-meal-field d-flex align-items-center">
                <label className="d-block d-sm-none mr-2">Meal:</label>
                <select
                  name="mealChoice"
                  className="form-control"
                  required
                  value={guest.mealOption}
                  onChange={e => this.handleMealChange(guest, e.target.value)}
                >
                  <option value="">Select a Meal</option>
                  {DINNER_OPTIONS.map(meal => (
                    <option key={meal} value={meal}>
                      {meal}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </li>
    )
  }

  render() {
    const {household} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <ul className="list-group list-group-flush mb-3">
          {_.map(household.guests, this.renderGuestField)}
        </ul>
        <textarea
          name="rsvpMessasge"
          className="form-control mb-3"
          placeholder="Feel free to leave us a message or ask any questions here..."
          value={this.state.rsvpMessage}
          onInput={this.handleInputChange}
          rows={3}
        />
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
    )
  }
}

export default HouseholdAttendanceForm
