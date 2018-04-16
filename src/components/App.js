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

class App extends Component {
  renderCurrentRoute() {
    const { history, routes } = this.props
    const Component = routes.get(history.location.pathname)
    return Component && <Component />
  }

  render() {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <main className="container">{this.renderCurrentRoute()}</main>
      </div>
    )
  }
}

export default App
