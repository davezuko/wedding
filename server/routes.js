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
route('GET', '/', (req, res) => res.render('index'))
route('GET', '/rsvp', (req, res) => res.render('rsvp'))
route('GET', '/admin', (req, res, next) => {
  if (!req.experimental) {
    next(createError(404))
    return
  }
  res.render('admin')
})

// API
// -------------------------
route('GET', '/api/guests', async (req, res) => GuestsService.list())
route('PUT', '/api/guests/:id', async (req, res) =>
  GuestsService.update(req.params.id, req.body)
)
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
route('POST', '/api/households/rsvp', async (req, res) =>
  GuestsService.submitRSVP(req.body)
)

export default router
