import {h, Component} from 'preact'
import cx from 'classnames'

class SuccessView extends Component {
  handleReturnToForm = e => {
    e.preventDefault()
    this.props.onReturnToForm()
  }

  render() {
    return (
      <div>
        <div className="section-wrapper">
          <section className="section my-card">
            <h2 className="section__header">Success!</h2>
            <div className="section__content">
              <p>Your responses have been saved!</p>
              <p>
                If you need to make any changes to your selections, you can{' '}
                <a href="#" onClick={this.handleReturnToForm}>
                  click here
                </a>{' '}
                to go back to the form. Otherwise, remember that you are welcome
                to come back any time between now and August 31, 2018 to update
                your selections.
              </p>
              <p>
                To return to the homepage, <a href="/">click here</a>.
              </p>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default SuccessView
