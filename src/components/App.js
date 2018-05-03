import { h, Component } from 'preact'
import Link from './Link'

const Navbar = ({ routes }) => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <Link className="navbar-brand" href="/">
      Home
    </Link>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav ml-md-auto">
        <li className="nav-item">
          <Link href="/about" className="nav-link">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/location" className="nav-link">
            Location
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/registry" className="nav-link">
            Registry
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

const Header = () => (
  <header className="header">
    <div>
      <h1 className="title">Jackie &amp; David</h1>
      <div className="subtitle">
        <span className="subtitle__content">We're Getting Married</span>
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
