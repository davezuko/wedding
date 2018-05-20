import React from 'react'
import * as router from '../../services/router'

class Link extends React.Component {
  handleClick = e => {
    e.preventDefault()
    router.push(this.props.href)
  }

  render() {
    const { className, children, href } = this.props
    return (
      <a href={href} className={className} onClick={this.handleClick}>
        {children}
      </a>
    )
  }
}

export default Link
