import _ from 'lodash'
import {h, Component} from 'preact'
import cx from 'classnames'
import * as HouseholdsService from '../../../services/households-service'
import * as GuestsService from '../../../services/guests-service'

const searchGuests = (search, guests) => {
  const value = search.toLowerCase()
  return _.filter(guests, guest => {
    const name = `${guest.firstName} ${guest.lastName}`.toLowerCase()
    return name.indexOf(value) !== -1
  })
}

const Checkmark = ({onChange, checked = false}) => (
  <i
    className={cx('checkmark fa-check-circle fa-2x', {
      far: !checked,
      fas: checked,
    })}
    onClick={onChange}
  />
)

class AdminApp extends Component {
  state = {
    guests: [],
    groupBy: 'Individual',
    search: '',
  }

  componentDidMount() {
    GuestsService.list().then(guests => this.setState({guests}))
  }

  handleGroupByChange = e => {
    this.setState({groupBy: e.target.value})
  }

  handleSearchChange = e => {
    this.setState({search: e.target.value})
  }

  toggleGuestInvitationStatus = guest => {
    const invitationSent = guest.invitationSent

    // TODO: real implementation
    guest.invitationSent = !invitationSent
    this.forceUpdate()

    GuestsService.update(guest.id, {
      invitationSent: !invitationSent,
    }).catch(() => {
      guest.invitationSent = invitationSent
      this.forceUpdate()
    })
  }

  toggleGuestThankYouSent = guest => {
    const thankYouSent = guest.thankYouSent

    // TODO: real implementation
    guest.thankYouSent = !thankYouSent
    this.forceUpdate()

    GuestsService.update(guest.id, {
      thankYouSent: !thankYouSent,
    }).catch(() => {
      guest.thankYouSent = thankYouSent
      this.forceUpdate()
    })
  }

  renderSummary() {
    const {households} = this.state

    const guests = this.state.guests
    const guestsByRSVPStatus = _.groupBy(
      guests,
      g => g.rsvpStatus || 'No Response'
    )

    const stat = (label, value) => (
      <div className="stat">
        <label>{label}</label>
        <span>{value}</span>
      </div>
    )
    return (
      <div className="stats">
        {stat('Total Guests', guests.length)}
        {stat('Accepted', _.get(guestsByRSVPStatus, 'Accepted', []).length)}
        {stat('Declined', _.get(guestsByRSVPStatus, 'Declined', []).length)}
        {stat(
          'No Response',
          _.get(guestsByRSVPStatus, 'No Response', []).length
        )}
      </div>
    )
  }

  renderGuestListHeader() {
    return (
      <li className="list-header">
        <div className="row">
          <div className="col-3">Name</div>
          <div className="col-2">Invite Sent</div>
          <div className="col-2">RSVP Status</div>
          <div className="col-2">Meal</div>
          <div className="col-2">Thank You Sent</div>
        </div>
      </li>
    )
  }

  renderHouseholds() {
    return (
      <div>
        <ul>{this.renderGuestListHeader()}</ul>
        <p>This doesn't work yet.</p>
      </div>
    )
  }

  renderIndividuals() {
    const guests = searchGuests(this.state.search, this.state.guests)
    return (
      <ul>
        {this.renderGuestListHeader()}
        {_.map(guests, this.renderGuestRow)}
      </ul>
    )
  }

  renderGuestRow = guest => {
    const invitationSent = !!guest.invitationSent

    return (
      <li className="guest-row">
        <div className="row">
          <div className="col-3">
            {guest.firstName} {guest.lastName}
          </div>
          <div className="col-2">
            <Checkmark
              checked={guest.invitationSent}
              onChange={() => this.toggleGuestInvitationStatus(guest)}
            />
          </div>
          <div className="col-2">
            {guest.rsvpStatus === null ? 'No Response' : guest.rsvpStatus}
          </div>
          <div className="col-2">
            {guest.mealOption === null ? 'Not Selected' : guest.mealOption}
          </div>
          <div className="col-2">
            <Checkmark
              checked={guest.thankYouSent}
              onChange={() => this.toggleGuestThankYouSent(guest)}
            />
          </div>
        </div>
      </li>
    )
  }

  renderGuests() {
    return this.state.groupBy === 'Individual'
      ? this.renderIndividuals()
      : this.renderHouseholds()
  }

  renderAdminControls() {
    const {groupBy, search} = this.state
    return (
      <div className="admin-bar">
        <div className="row">
          <div className="col-4">
            <input
              className="form-control"
              name="search"
              placeholder="Search"
              autofocus
              value={search}
              onInput={this.handleSearchChange}
            />
          </div>
          <div className="col">
            <div className="btn-group btn-group-default btn-group-toggle">
              {['Individual', 'Household'].map(option => {
                const isChecked = option === groupBy
                return (
                  <label
                    className={cx('btn btn-secondary', {active: isChecked})}
                  >
                    <input
                      type="radio"
                      name="group-by"
                      value={option}
                      autocomplete="off"
                      checked={isChecked}
                      onChange={this.handleGroupByChange}
                    />
                    {option}
                  </label>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="admin">
        <header>
          <h1 className="display-4">Admin Panel</h1>
          {this.renderSummary()}
        </header>
        {this.renderAdminControls()}
        {this.renderGuests()}
      </div>
    )
  }
}

export default AdminApp
