import express from 'express'
import * as HouseholdsService from './services/households-service'

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

route('GET', '/', () => res.render('index'))
route('GET', '/rsvp', () => res.render('rsvp'))
route('GET', '/api/households', async (req, res) => {
  res.json(await HouseholdsService.list())
})

export default router
