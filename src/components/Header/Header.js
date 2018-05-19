import { h, Component } from 'preact'
import Navigation from './Navigation'

const Header = () => (
  <header className="header">
    <Navigation />
    <h1 className="header__title">Jackie Kutcher & David Zukowski</h1>
    <span className="header__subtitle">
      September 22, 2018 &mdash; Rochester, MI
    </span>
  </header>
)

export default Header
