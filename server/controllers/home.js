class HomeController {
  constructor() {
    this.index = this.index.bind(this)
  }

  async index(req, res, next) {
    return res.render('index')
  }
}

export default new HomeController()
