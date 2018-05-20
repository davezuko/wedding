import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import routes from './routes'
import './styles/main.css'

const mountApp = () => {
  const root = document.getElementById('root')

  ReactDOM.unmountComponentAtNode(root)
  ReactDOM.render(<App routes={routes} />, root)
}

if (__DEV__) {
  module.hot.accept(['./routes', './components/App'], () => {
    mountApp()
  })
}

mountApp()
