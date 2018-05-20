import React from 'react'

class Image extends React.Component {
  render() {
    const { src } = this.props
    return <img className="image" src={src} />
  }
}

export default Image
