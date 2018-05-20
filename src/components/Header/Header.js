import { h, Component } from 'preact'
import Navigation from './Navigation'

const Header = ({ title, subtitle }) => (
  <header className="header">
    <Navigation />
    <h1 className="header__title">{title}</h1>
    <span className="header__subtitle">{subtitle}</span>
  </header>
)

export default Header
