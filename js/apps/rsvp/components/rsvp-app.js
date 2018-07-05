import {h, Component} from 'preact'
import cx from 'classnames'
import * as HouseholdsService from '../../../services/households-service'

class RSVPApp extends Component {
  state = {
    firstName: '',
    lastName: '',
    households: [],
  }

  componentDidMount() {
    HouseholdsService.list().then(households => {
      this.setState({households})
    })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleRSVPStatusChange = (guest, status) => {}

  get household() {
    const firstName = this.state.firstName.trim().toLowerCase()
    const lastName = this.state.lastName.trim().toLowerCase()
    if (!firstName || !lastName) return

    return this.state.households.find(hh => {
      return hh.guests.find(guest => {
        return (
          guest.firstName.toLowerCase().includes(firstName) &&
          guest.lastName.toLowerCase().includes(lastName)
        )
      })
    })
  }

  renderHousehold(household) {
    return (
      <div>
        <div className="d-flex">
          <h3>Your Household</h3>
          <div className="ml-auto">Attending?</div>
        </div>
        <ul>
          {household.guests.map((guest, idx) => (
            <li key={idx} className="mb-2">
              <div className="row">
                <span className="col-7">
                  {guest.firstName} {guest.lastName}
                </span>
                <div className="col d-flex">
                  <button
                    type="button"
                    className={cx('btn btn-block mr-2', {
                      active: guest.rsvpStatus === 'Accepted',
                      'btn-outline-primary': guest.rsvpStatus === 'Accepted',
                      'btn-outline-secondary': guest.rsvpStatus !== 'Accepted',
                    })}
                    onClick={() =>
                      this.handleRSVPStatusChange(guest, 'Accepted')
                    }
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={cx('btn btn-outline-secondary btn-block mt-0', {
                      active: guest.rsvpStatus === 'Declined',
                    })}
                    onClick={() =>
                      this.handleRSVPStatusChange(guest, 'Declined')
                    }
                  >
                    No
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {firstName, lastName} = this.state
    const household = this.household

    return (
      <div className="rsvp">
        <section className="section my-card">
          <h2 className="section__header">Wedding RSVP</h2>
          <div className="section__content">
            <div className="rsvp-header text-center">
              <h3>Great Oaks Country Club</h3>
              <p>
                777 Great Oaks Blvd<br />
                Rochester Hills, MI 48307<br />
                Saturday, September 22, 2018
              </p>
              <hr />
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row mb-4">
                <div className="form-group col">
                  <label for="exampleInputEmail1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Your first name"
                    autofocus
                    value={firstName}
                    onInput={this.handleInputChange}
                  />
                </div>
                <div className="form-group col">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Your last name"
                    value={lastName}
                    onInput={this.handleInputChange}
                  />
                </div>
              </div>
              {household && this.renderHousehold(household)}
              {!household && (
                <p className="text-center">
                  Start typing your name to search for your household.
                </p>
              )}
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default RSVPApp
