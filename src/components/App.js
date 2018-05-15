import { h, Component } from 'preact'
import Navigation from './Navigation'

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
        <header>
          <Navigation />
          <div className="header">
            <div>
              <h1 className="header__title">Jackie Kutcher & David Zukowski</h1>
              <span className="header__subtitle">
                September 22, 2018 &mdash; Rochester, MI
              </span>
            </div>
          </div>
        </header>
        <div className="viewport">
          <main className="viewport__content">{this.renderCurrentRoute()}</main>
        </div>
      </div>
    )
  }
}

export default App
