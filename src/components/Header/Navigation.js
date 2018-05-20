import React from 'react'
import { Link } from '../Link'
import * as router from '../../services/router'

const NavItem = ({ href, title, location = router.getLocation() }) => (
  <li
    className={
      'nav-item' + (location.pathname === href ? ' nav-item--active' : '')
    }
  >
    <Link href={href} className="nav-link">
      {title}
    </Link>
  </li>
)

class Navigation extends React.Component {
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
                <NavItem key={href} href={href} title={title} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation
