import express from 'express'
import * as GuestsService from './services/guests-service'

const router = express.Router()
const route = (method, path, handler) => {
  router[method.toLowerCase()](path, async (req, res, next) => {
    try {
      await handler(req, res, next)
    } catch (e) {
      next(e)
    }
  })
}

// Views
route('GET', '/', (req, res) => res.render('index'))
route('GET', '/rsvp', (req, res) => res.render('rsvp'))

// API
route('GET', '/api/households', async (req, res) => {
  if ('firstName' in req.query && 'lastName' in req.query) {
    const {firstName, lastName} = req.query
    res.json(await GuestsService.findHousehold(firstName, lastName))
    return
  }
  res.json(await GuestsService.list())
})

export default router
