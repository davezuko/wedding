import { h, Component } from 'preact'
import { Header } from './Header'
import { Footer } from './Footer'
import ContentContainer from './ContentContainer'

const normalizeLocation = location => ({
  ...location,
  pathname:
    location.pathname.length > 1
      ? location.pathname.replace(/\/$/, '')
      : location.pathname,
})

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
        location: normalizeLocation(this.props.history.location),
      },
    }
  }

  updateTitle() {
    const pageTitle = this.state.route.title
    const title = `${pageTitle} | David and Jackie`
    document.querySelector('title').innerHTML = title
  }

  matchRoute(location) {
    const { pathname } = normalizeLocation(location)
    return this.props.routes.get(pathname)
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

  render() {
    const { route: CurrentRoute } = this.state
    const { title, subtitle } = CurrentRoute.header

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="viewport">
          <main className="viewport__content">
            <ContentContainer>
              <CurrentRoute />
            </ContentContainer>
          </main>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
