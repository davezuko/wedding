import React from 'react'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7

const TARGET = +new Date('2018-09-22T12:00:00')

class Countdown extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.updateRemainingTime = this.updateRemainingTime.bind(this)
    this.state = {
      remainingTime: this.getRemainingTime(),
    }
  }

  componentDidMount() {
    this._interval = setInterval(this.updateRemainingTime, 1000)
  }

  componentWillUnmount() {
    clearInterval(this._interval)
  }

  getRemainingTime() {
    return TARGET - Date.now()
  }

  updateRemainingTime() {
    this.setState({ remainingTime: this.getRemainingTime() })
  }

  renderUnit(label, value) {
    return (
      <div className="countdown-unit">
        <span className="countdown-unit__value">{value}</span>
        <span className="countdown-unit__label">{label}</span>
      </div>
    )
  }

  get remainingTime() {
    let { remainingTime } = this.state
    let days = 0
    let hours = 0
    let minutes = 0
    let seconds = 0

    while (DAY <= remainingTime) days++, (remainingTime -= DAY)
    while (HOUR <= remainingTime) hours++, (remainingTime -= HOUR)
    while (MINUTE <= remainingTime) minutes++, (remainingTime -= MINUTE)
    while (SECOND <= remainingTime) seconds++, (remainingTime -= SECOND)
    return { days, hours, minutes, seconds }
  }

  render() {
    const { days, hours, minutes, seconds } = this.remainingTime

    return (
      <div className="countdown">
        <div className="countdown__content">
          {this.renderUnit('days', days)}
          {this.renderUnit('hours', hours)}
          {this.renderUnit('minutes', minutes)}
          {this.renderUnit('seconds', seconds)}
        </div>
      </div>
    )
  }
}

export default Countdown
