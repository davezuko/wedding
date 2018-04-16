import { h, render } from 'preact'
import App from './components/App'
import createBrowserHistory from 'history/createBrowserHistory'
import routes from './routes'
import './styles/main.css'

const history = createBrowserHistory()

const mountApp = () => {
  const root = document.getElementById('root')

  render('', document.body, root.firstChild)
  render(<App history={history} routes={routes} />, root)
}

mountApp()
