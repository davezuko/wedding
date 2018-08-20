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
              <h3 className="mt-4">While You're at It... Request a Song</h3>
              <p>
                While you're here, how about requesting a song at the wedding?{' '}
                <a href="http://my.elysiumexp.com/kutcher-zukowski-requests.php">
                  Click here
                </a>{' '}
                to visit our DJ's song request form to submit a recommendation.
              </p>
              <p className="mt-4">
                All finished? <a href="/">Return to the homepage</a>.
              </p>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default SuccessView
