import Households from '../models/households'
import createError from 'http-errors'

class RSVPController {
  constructor() {
    this.index = this.index.bind(this)
    this.submit = this.submit.bind(this)
    this.listHouseholds = this.listHouseholds.bind(this)
  }

  async index(req, res, next) {
    return res.render('rsvp')
  }

  async submit(req, res, next) {
    try {
      const {household, comments} = req.body
      await Households.save(household, comments)
      res.json(household)
    } catch (e) {
      next(e)
    }
  }

  async listHouseholds(req, res, next) {
    try {
      res.json(await Households.list())
    } catch (e) {
      next(e)
    }
  }
}

export default new RSVPController()
