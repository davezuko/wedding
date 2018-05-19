import { h, Component } from 'preact'

class Image extends Component {
  render() {
    const { src } = this.props
    return <img className="image" src={src} />
  }
}

export default Image
