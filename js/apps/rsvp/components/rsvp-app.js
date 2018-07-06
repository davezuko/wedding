import {h, Component} from 'preact'
import cx from 'classnames'
import * as HouseholdsService from '../../../services/households-service'

class RSVPApp extends Component {
  state = {
    firstName: '',
    lastName: '',
    households: [],
    rsvpMessage: '',
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

  handleRSVPStatusChange = (guest, status) => {
    guest.rsvpStatus = guest.rsvpStatus === status ? 'No Response' : status
    this.forceUpdate()
  }

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
        <div className="d-flex mb-2 align-items-end">
          <h3>We Found Your Household!</h3>
          <div className="ml-auto">Attending?</div>
        </div>
        <ul className="list-group list-group-flush mb-3">
          {household.guests.map((guest, idx) => (
            <li
              key={idx}
              className="list-group-item pl-0 pr-0"
              style={{background: 'none'}}
            >
              <div className="row">
                <span className="col-5">
                  {guest.firstName} {guest.lastName}
                </span>
                <div className="col">
                  <div className="row">
                    {guest.rsvpStatus === 'Accepted' && (
                      <div className="col-6">
                        <select name="mealChoice" class="form-control">
                          <option value="">Meal Choice</option>
                          <option value="chicken">Chicken</option>
                          <option value="steak">Steak</option>
                        </select>
                      </div>
                    )}
                    <div className="col-6 ml-auto d-flex">
                      <button
                        type="button"
                        className={cx('btn btn-block mr-2', {
                          active: guest.rsvpStatus === 'Accepted',
                          'btn-outline-primary':
                            guest.rsvpStatus === 'Accepted',
                          'btn-outline-secondary':
                            guest.rsvpStatus !== 'Accepted',
                        })}
                        onClick={() =>
                          this.handleRSVPStatusChange(guest, 'Accepted')
                        }
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={cx(
                          'btn btn-outline-secondary btn-block mt-0',
                          {
                            active: guest.rsvpStatus === 'Declined',
                          }
                        )}
                        onClick={() =>
                          this.handleRSVPStatusChange(guest, 'Declined')
                        }
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <textarea
          name="rsvpMessasge"
          className="form-control"
          placeholder="Feel free to leave us a message or ask any questions here..."
          value={this.state.rsvpMessage}
          onInput={this.handleInputChange}
          rows={3}
        />
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
            <div className="rsvp-header text-center d-none">
              <h3>Great Oaks Country Club</h3>
              <p>
                777 Great Oaks Blvd<br />
                Rochester, MI 48307<br />
                Saturday, September 22, 2018
              </p>
              <hr />
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-4">
                <div className="row">
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
              </div>
              {household ? (
                this.renderHousehold(household)
              ) : (
                <p className="text-center">
                  Start typing your name above and we'll find your household.
                </p>
              )}
              {household && (
                <div className="d-flex justify-content-end mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block w-50"
                  >
                    Submit
                  </button>
                </div>
              )}
              <hr />
              <p className="text-center">
                Having trouble? Feel free to send us an email at{' '}
                <a href="mailto:rsvp@davidandjackiewedding.com">
                  rsvp@davidandjackiewedding.com
                </a>
              </p>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default RSVPApp
