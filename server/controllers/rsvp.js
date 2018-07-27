import Households from '../models/households'
import logger from '../utils/logger'

class RSVPController {
  constructor() {
    this.index = this.index.bind(this)
    this.submit = this.submit.bind(this)
    this.listHouseholds = this.listHouseholds.bind(this)
  }

  /**
   * Renders the index route.
   */
  async index(req, res, next) {
    return res.render('rsvp')
  }

  /**
   * Handles RSVP form submissions.
   */
  async submit(req, res, next) {
    try {
      const {household, comments} = req.body
      await Households.save(household, comments)
      res.json(household)
    } catch (e) {
      logger.error(`Error saving RSVP submission: ${e.message}`)
      next(e)
    }
  }

  /**
   * Returns the list of households invited to the wedding.
   */
  async listHouseholds(req, res, next) {
    try {
      res.json(await Households.list())
    } catch (e) {
      next(e)
    }
  }
}

export default new RSVPController()
