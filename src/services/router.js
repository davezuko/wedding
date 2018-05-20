import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

export const push = history.push.bind(history)
export const replace = history.replace.bind(history)
export const subscribe = history.listen.bind(history)

export const getLocation = () => ({
  ...history.location,
  pathname:
    history.location.pathname.length > 1
      ? history.location.pathname.replace(/\/$/, '')
      : history.location.pathname,
})
