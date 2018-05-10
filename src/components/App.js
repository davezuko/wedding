import { h, Component } from 'preact'
import Countdown from './Countdown'

const Header = () => (
  <header className="header">
    <div>
      <h1 className="title">
        <small>Join us for the wedding of</small>
        <span className="name">Jackie Kutcher</span>
        <span className="and">&amp;</span>
        <span className="name">David Zukowski</span>
      </h1>
      <Countdown />
      <div className="subtitle">
        <small className="subtitle--desktop">Invitations to come, check back then for more!</small>
        <small className="subtitle--mobile">on 9/18/18.<br />Invitations to come, check back then for more!</small>
      </div>
    </div>
  </header>
)

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      location: this.props.history.location,
    }
  }

  getChildContext() {
    return {
      router: {
        push: this.props.history.push,
        replace: this.props.history.replace,
      },
    }
  }

  componentDidMount() {
    this._unsubscribeHistory = this.props.history.listen(() => {
      this.setState({ location: this.props.history.location })
    })
  }

  componentWillUnmount() {
    this._unsubscribeHistory()
  }

  renderCurrentRoute() {
    const Component = this.props.routes.get(this.state.location.pathname)
    return Component && <Component />
  }

  render() {
    return (
      <div>
        <Header />
        <main className="container">{this.renderCurrentRoute()}</main>
      </div>
    )
  }
}

export default App
