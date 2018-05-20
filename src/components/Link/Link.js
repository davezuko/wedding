import { h, Component } from 'preact'

class Link extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(e) {
    e.preventDefault()
    this.context.router.push(this.props.href)
  }

  render() {
    const { className, children, href } = this.props
    return (
      <a href={href} className={className} onClick={this._handleClick}>
        {children}
      </a>
    )
  }
}

export default Link
