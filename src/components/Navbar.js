import { h, Component } from 'preact'

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

export default Navbar
