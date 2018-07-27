import fs from 'fs'
import path from 'path'
import express from 'express'
import logger from 'morgan'
import createError from 'http-errors'
import {getHashedAssetPath} from './utils/assets'

// environment flags
const IS_LOCAL = process.env.NODE_ENV === 'development'

// application
const app = express()

// logging
logger.token('remote-addr', (req, res) => {
  return (
    req['x-real-ip'] ||
    req.ip ||
    req._remoteAddress ||
    (req.connection && req.connection.remoteAddress)
  )
})

const logs = path.resolve(__dirname, '../logs')
if (!fs.existsSync(logs)) {
  fs.mkdirSync(logs)
}
app.use(logger('dev'))
app.use(
  logger('combined', {
    stream: fs.createWriteStream(path.resolve(logs, 'access.log'), {
      flags: 'a',
    }),
  })
)

// core middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../dist')))

// routes
app.use((req, res, next) => {
  res.locals.development = IS_LOCAL
  res.locals.getHashedAssetPath = getHashedAssetPath
  next()
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(require('./routes').default)

// live reload
if (IS_LOCAL) {
  app.use(require('tiny-lr').middleware({app}))
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.error(err)
  res.status(err.status || 500)
  res.render('error')
})

export default app
