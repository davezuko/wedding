import { h, Component } from 'preact'
import Link from './Link'

class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" href="/">
            Jackie & David
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-md-auto">
              {[
                ['/about-us', 'About'],
                ['/location', 'Location'],
                ['/registry', 'Registry'],
              ].map(([href, title]) => (
                <li className="nav-item">
                  <Link href={href} className="nav-link">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation
