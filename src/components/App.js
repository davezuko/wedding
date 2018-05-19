import { h, Component } from 'preact'
import { Header } from './Header'
import { Footer } from './Footer'
import ContentContainer from './ContentContainer'

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      route: this.matchRoute(this.props.history.location),
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

  updateTitle() {
    const pageTitle = this.state.route.title
    const title = `${pageTitle} | David and Jackie`
    document.querySelector('title').innerHTML = title
  }

  matchRoute(location) {
    return this.props.routes.get(location.pathname)
  }

  componentDidMount() {
    this.updateTitle()
    this._unsubscribeHistory = this.props.history.listen(location => {
      this.setState({ route: this.matchRoute(location) })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.route !== prevState.route) {
      this.updateTitle()
    }
  }

  componentWillUnmount() {
    this._unsubscribeHistory()
  }

  renderCurrentRoute() {
    const { route: RouteComponent } = this.state
    if (RouteComponent) {
      return <RouteComponent />
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="viewport">
          <main className="viewport__content">{this.renderCurrentRoute()}</main>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
