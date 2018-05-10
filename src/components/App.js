import { h, Component } from 'preact'

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      location: this.props.history.location,
    }
  }

  getChildContext() {
    return {
      router: {
        push: this.props.history.push,
        replace: this.props.history.replace,
      },
    }
  }

  componentDidMount() {
    this._unsubscribeHistory = this.props.history.listen(() => {
      this.setState({ location: this.props.history.location })
    })
  }

  componentWillUnmount() {
    this._unsubscribeHistory()
  }

  renderCurrentRoute() {
    const Component = this.props.routes.get(this.state.location.pathname)
    return Component && <Component />
  }

  render() {
    return (
      <div>
        <main>{this.renderCurrentRoute()}</main>
      </div>
    )
  }
}

export default App
