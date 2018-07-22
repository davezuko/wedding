import _ from 'lodash'
import express from 'express'
import createError from 'http-errors'
import * as GuestsService from './services/guests-service'

const router = express.Router()
const route = (method, path, handler) => {
  router[method.toLowerCase()](path, async (req, res, next) => {
    try {
      const result = await handler(req, res, next)
      if (typeof res === 'object') {
        res.json(result)
      }
    } catch (e) {
      next(e)
    }
  })
}

// Views
// -------------------------
const IS_DEV = process.env.NODE_ENV === 'development'

route('GET', '/', (req, res) => res.render('index'))
route('GET', '/rsvp', (req, res, next) => {
  if (req.experimental) {
    res.render('rsvp')
    return
  }

  next(createError(404))
})
route('GET', '/admin', (req, res, next) => {
  if (req.experimental) {
    res.render('admin')
    return
  }
  next(createError(404))
})

// API
// -------------------------
route('GET', '/api/guests', async (req, res) => {
  return GuestsService.list()
})

route('PUT', '/api/guests/:id', async (req, res) => {
  return GuestsService.update(req.params.id, req.body)
})

route('GET', '/api/households', async (req, res) => {
  // Find a household for a given guest name
  if ('firstName' in req.query && 'lastName' in req.query) {
    const {firstName, lastName} = req.query
    return GuestsService.findHousehold(firstName, lastName)
  }

  // Special "RSVP" format which trims unneeded data for the RSVP app
  if ('rsvp' in req.query) {
    const households = await GuestsService.listHouseholds()
    return _.map(households, household => {
      household.guests = _.map(household.guests, guest => {
        return _.pick(guest, [
          'id',
          'firstName',
          'lastName',
          'mealOption',
          'rsvpStatus',
          'rsvpMessage',
        ])
      })
      return household
    })
  }
  return GuestsService.listHouseholds()
})

export default router
