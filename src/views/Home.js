import { h, Component } from 'preact'
import Countdown from '../components/Countdown'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home__content">
          <header className="container">
            <h1 className="splash">
              <small className="d-block">Join us for the wedding of</small>
              <div className="splash__names">
                <span className="splash__name">Jackie Kutcher</span>
                <span className="d-inline-block mr-4 ml-4">&amp;</span>
                <span className="splash__name">David Zukowski</span>
              </div>
            </h1>
          </header>
          <Countdown />
          <footer className="container">
            <small className="subtitle">
              <span className="subtitle__date">on 9/22/18.</span>
              Invitations to come, check back then for more!
            </small>
          </footer>
        </div>
      </div>
    )
  }
}

export default Home
