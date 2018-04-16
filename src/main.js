import { h, render } from 'preact'
import App from './components/App'
import './styles/main.css'

const mountApp = () => {
  render('', document.body, window.__root__)
  window.__root__ = render(<App />, document.body)
}

mountApp()
