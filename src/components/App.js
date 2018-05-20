import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import ContentContainer from './ContentContainer'
import * as router from '../services/router'

class App extends React.Component {
  state = {
    route: this.matchRoute(router.getLocation()),
  }

  updateTitle() {
    const pageTitle = this.state.route.title
    const title = `${pageTitle} | David and Jackie`
    document.querySelector('title').innerHTML = title
  }

  matchRoute(location) {
    return this.props.routes.get(router.getLocation().pathname)
  }

  componentDidMount() {
    this.updateTitle()
    this._unsubscribeFromHistory = router.subscribe(location => {
      this.setState({ route: this.matchRoute(location) })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.route !== prevState.route) {
      this.updateTitle()
    }
  }

  componentWillUnmount() {
    this._unsubscribeFromHistory()
  }

  render() {
    const { route: CurrentRoute } = this.state
    const { title, subtitle } = CurrentRoute.header

    console.log('rendering!')
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
