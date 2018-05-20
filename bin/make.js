// import fs from 'fs'
// import path from 'path'
// import { promisify } from 'util'
// import React from 'react'
// import App from '../src/components/App'
// import routes from '../src/routes'
// import createMemoryHistory from 'history/createMemoryHistory'
// import cp from 'child_process'

// global.__DEV__ = false

// const exec = promisify(cp.exec)
// const writeFile = promisify(fs.writeFile)

// const TEMPLATE = fs.readFileSync(
//   path.resolve(__dirname, '../dist/index.html'),
//   'utf8'
// )

// const mkdirp = pathname => exec(`mkdirp ${pathname}`)

// const renderRoute = (route, component) => {
//   return Promise.resolve().then(() => {
//     console.log('rendering ' + route)
//     const dest = path.resolve(__dirname, '../dist', `.${route}`)
//     return mkdirp(dest).then(() => {
//       const history = createMemoryHistory({ initialEntries: [route] })
//       const html = render(<App history={history} routes={routes} />)
//       return writeFile(
//         path.resolve(dest, 'index.html'),
//         TEMPLATE.replace(
//           '<div id="root"></div>',
//           `<div id="root">${html}</div>`
//         ),
//         'utf8'
//       )
//     })
//   })
// }

// const make = () => {
//   Promise.all([...routes.entries()].map(route => renderRoute(...route)))
// }

// // make()
