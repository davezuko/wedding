import {h, Component} from 'preact'
import cx from 'classnames'
import * as HouseholdsService from '../../../services/households-service'
import HouseholdAttendanceForm from './household-attendance-form'

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

  handleSubmit = household => {
    HouseholdsService.submitRSVP(household)
  }

  handleInputChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  get selectedHousehold() {
    const firstName = this.state.firstName.trim().toLowerCase()
    const lastName = this.state.lastName.trim().toLowerCase()
    if (!firstName || !lastName) return

    const matchingHouseholds = this.state.households.filter(hh => {
      return hh.guests.find(guest => {
        return (
          guest.firstName.toLowerCase().includes(firstName) &&
          guest.lastName.toLowerCase().includes(lastName)
        )
      })
    })
    if (matchingHouseholds.length === 1) {
      return matchingHouseholds[0]
    }
  }

  render() {
    const {firstName, lastName} = this.state
    const selectedHousehold = this.selectedHousehold

    return (
      <div className="rsvp">
        <div className="section-wrapper">
          <section className="section my-card">
            <h2 className="section__header">Wedding RSVP</h2>
            <div className="section__content">
              <div className="row mb-3">
                <div className="form-group col-12 col-sm-6">
                  <label htmlFor="firstName">Your First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Your first name"
                    value={firstName}
                    onInput={this.handleInputChange}
                    autofocus
                  />
                </div>
                <div className="form-group col-12 col-sm-6">
                  <label htmlFor="lastName">Your Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Your last name"
                    value={lastName}
                    onInput={this.handleInputChange}
                  />
                </div>
              </div>
              {selectedHousehold ? (
                <div>
                  <div className="mb-3">
                    <h3>We Found Your Household!</h3>
                    <p>
                      Let us know who's coming by clicking <strong>Yes</strong>{' '}
                      or <strong>No</strong> next to each guest below. For those
                      attending, select the desired meal. When you are done,
                      press <strong>Submit</strong> to save your information.
                    </p>
                    <p>
                      Heads up! You are welcome to come back to change your
                      selections up until August 31, 2018.
                    </p>
                  </div>
                  <HouseholdAttendanceForm
                    household={selectedHousehold}
                    onSubmit={this.handleSubmit}
                  />
                </div>
              ) : (
                <p className="text-center">
                  Start typing your name above. We'll automatically find your
                  household and show your guest list below.
                  <br />
                </p>
              )}

              <hr />
              <p className="text-center">
                Having trouble? Try entering the name of somebody else in your
                household. Alternatively, send us an email at{' '}
                <a href="mailto:rsvp@davidandjackiewedding.com">
                  rsvp@davidandjackiewedding.com
                </a>
              </p>
            </div>
          </section>
          <aside className="venue-location">
            <h3>Great Oaks Country Club</h3>
            <p>
              777 Great Oaks Blvd<br />
              Rochester, MI 48307<br />
              Saturday, September 22, 2018
            </p>
          </aside>
        </div>
      </div>
    )
  }
}

export default RSVPApp
