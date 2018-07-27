import {h, Component} from 'preact'
import cx from 'classnames'
import * as HouseholdsService from '../../../services/households-service'
import HouseholdAttendanceForm from './household-attendance-form'
import SuccessView from './success-view'

class RSVPApp extends Component {
  state = {
    firstName: 'Mark',
    lastName: 'Kutcher',
    households: [],
    submitted: false,
  }

  componentDidMount() {
    HouseholdsService.list().then(households => {
      this.setState({households})
    })
  }

  handleSubmitted = () => {
    this.setState({submitted: true})
  }

  handleReturnToForm = () => {
    this.setState({submitted: false})
  }

  handleInputChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  get matchingHouseholds() {
    const firstName = this.state.firstName.trim().toLowerCase()
    const lastName = this.state.lastName.trim().toLowerCase()

    if (!lastName) return []

    // Search by last name first, since it has the highest likelyhood of
    // being unique.
    const matchingHouseholds = this.state.households.filter(hh => {
      return hh.guests.find(guest => {
        return guest.lastName.toLowerCase().indexOf(lastName) !== -1
      })
    })

    // No last name match, exit early
    if (!matchingHouseholds.length) return []

    // Last name matched exactly one household, so we don't have to check the
    // first name.
    if (matchingHouseholds.length === 1) {
      return matchingHouseholds
    }

    // More than one household matched this last name, so take the first name
    // into consideration.
    return matchingHouseholds.filter(hh => {
      return hh.guests.find(guest => {
        return guest.firstName.toLowerCase().indexOf(firstName) !== -1
      })
    })
  }

  renderContent() {
    const {submitted, firstName, lastName} = this.state
    if (submitted) {
      return <SuccessView />
    }

    const matchingHouseholds = this.matchingHouseholds
    const selectedHousehold =
      matchingHouseholds.length === 1 ? matchingHouseholds[0] : null

    return (
      <div>
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
                Let us know who's coming by selecting <strong>Yes</strong> or{' '}
                <strong>No</strong> next to each guest below. If you don't know
                yet, you can leave it blank and come back later.
              </p>
              <p>
                For those attending, select the desired meal. When you are done,
                press <strong>Submit</strong> to save your information. You are
                welcome to come back to change your selections until August 31,
                2018.
              </p>
            </div>
            <HouseholdAttendanceForm
              household={selectedHousehold}
              onSubmitted={this.handleSubmitted}
            />
          </div>
        ) : (
          <p className="text-center">
            Start typing your name above. We'll automatically find your
            household and show your guest list below.
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
    )
  }

  render() {
    if (this.state.submitted) {
      return (
        <div className="rsvp">
          <SuccessView onReturnToForm={this.handleReturnToForm} />
        </div>
      )
    }

    return (
      <div className="rsvp">
        <div className="section-wrapper">
          <section className="section my-card">
            <h2 className="section__header">Wedding RSVP</h2>
            <div className="section__content">{this.renderContent()}</div>
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
