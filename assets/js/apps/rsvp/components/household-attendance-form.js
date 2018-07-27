import _ from 'lodash'
import {h, Component} from 'preact'
import cx from 'classnames'
import * as HouseholdsService from '../../../services/households-service'

const DINNER_OPTIONS = ['Steak', 'Salmon', 'Vegetarian']

const RSVPStatusField = ({onChange, value}) => {
  const declined = value === false
  const accepted = value === true

  return (
    <div className="rsvp-status-field">
      <button
        type="button"
        className={cx('btn btn-block mr-2', {
          active: accepted,
          'btn-outline-primary': accepted,
          'btn-outline-secondary': !accepted,
        })}
        onClick={() => onChange(true)}
      >
        Yes
      </button>
      <button
        type="button"
        className={cx('btn btn-outline-secondary btn-block mt-0', {
          active: declined,
        })}
        onClick={() => onChange(false)}
      >
        No
      </button>
    </div>
  )
}

class HouseholdAttendanceForm extends Component {
  state = {
    comments: this.props.household.guests[0].rsvpMessage || '',
    isSubmitting: false,
  }

  handleSubmit = e => {
    e.preventDefault()

    const {household} = this.props
    const {comments} = this.state

    this.setState({isSubmitting: true})
    HouseholdsService.submitRSVP({household, comments})
      .then(res => {
        this.setState({isSubmitting: false})
        this.props.onSubmitted()
      })
      .catch(err => {
        // TODO: show some error
        this.setState({isSubmitting: false})
      })
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
    const isAttending = guest.rsvpStatus === true
    console.log(guest)

    return (
      <li key={guest.id} className="list-group-item guest-rsvp-fieldset">
        <div className="row">
          <div className="col col-sm-3">
            <RSVPStatusField
              value={isAttending}
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
    const {household, comments} = this.props
    const {isSubmitting} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <ul className="list-group list-group-flush mb-3">
          {_.map(household.guests, this.renderGuestField)}
        </ul>
        <textarea
          name="comments"
          className="form-control mb-3"
          placeholder="Feel free to leave us a note or ask any questions here..."
          value={comments}
          onInput={this.handleInputChange}
          rows={3}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>
              <i className="fas fa-spinner fa-spin" />&nbsp;&nbsp;Submitting...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    )
  }
}

export default HouseholdAttendanceForm
