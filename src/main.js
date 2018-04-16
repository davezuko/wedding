import { h, render } from 'preact'
import App from './components/App'
import createBrowserHistory from 'history/createBrowserHistory'
import routes from './routes'
import './styles/main.css'

const history = createBrowserHistory()

const mountApp = () => {
  render('', document.body, window.__root__)
  window.__root__ = render(
    <App history={history} routes={routes} />,
    document.body
  )
}

mountApp()
