import express from 'express'
import path from 'path'
import logger from 'morgan'
import createError from 'http-errors'

const app = express()

// fundamental middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../dist')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// routes
const router = express.Router()

router.get('/', (req, res, next) => res.render('index'))
router.get('/rsvp', (req, res, next) => res.render('rsvp'))

app.use(router)

// Live reload
app.use(require('tiny-lr').middleware({app}))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
