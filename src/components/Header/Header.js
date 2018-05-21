import React from 'react'
import Navigation from './Navigation'
import ContentContainer from '../ContentContainer'

const Header = ({ title, subtitle }) => (
  <header className="header">
    <Navigation />
    <ContentContainer>
      <h1 className="header__title">{title}</h1>
      <span className="header__subtitle">{subtitle}</span>
    </ContentContainer>
  </header>
)

export default Header
