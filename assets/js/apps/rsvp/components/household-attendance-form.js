import _ from 'lodash'
import cx from 'classnames'
import {h, Component} from 'preact'
import * as HouseholdsService from '../../../services/households-service'

const DINNER_OPTIONS = ['Steak', 'Salmon', 'Vegetarian', 'Kid Meal']

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
    isSubmitting: false,
  }

  handleSubmit = e => {
    e.preventDefault()

    const {household} = this.props

    this.setState({isSubmitting: true})
    HouseholdsService.submitRSVP(household, this.comments)
      .then(res => {
        this.setState({isSubmitting: false})
        this.props.onSubmitted(res.data)
      })
      .catch(err => {
        // TODO: show a real error
        alert('Something went wrong while submitting the form')
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

  handleInputChange = e => {
    switch (e.target.name) {
      case 'comments':
        this.props.household.guests[0].rsvpMessage = e.target.value
        this.forceUpdate()
        break
      default:
      // noop
    }
  }

  get comments() {
    return this.props.household.guests[0].rsvpMessage || ''
  }

  renderGuestField = guest => {
    const isAttending = guest.rsvpStatus === true

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
            {guest.firstName === 'Guest'
              ? 'Guest'
              : `${guest.firstName} ${guest.lastName}`}
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
    const {household} = this.props
    const {isSubmitting} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <ul className="list-group list-group-flush mb-3">
          {_.map(household.guests, this.renderGuestField)}
        </ul>
        <textarea
          name="comments"
          className="form-control mb-3"
          placeholder="Questions? Did we miss someone? Just want to leave a note?"
          value={this.comments}
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
