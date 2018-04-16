import { h, Component } from 'preact'

class Link extends Component {
  render() {
    const { className, children, href } = this.props
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
}

export default Link
