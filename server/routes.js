import express from 'express'
import HomeController from './controllers/home'
import RSVPController from './controllers/rsvp'

const router = express.Router()

// Views
router.get('/', HomeController.index)
router.get('/rsvp', RSVPController.index)

// API
router.get('/api/households', RSVPController.listHouseholds)
router.post('/api/rsvp', RSVPController.submit)

export default router
