import {Pool} from 'pg'

const pool = new Pool()

class Model {
  constructor() {
    this._pool = pool
  }

  async connect() {
    return this._pool.connect()
  }

  async query(...args) {
    return this._pool.query(...args)
  }

  async transaction(cb) {
    const client = await this.connect()
    try {
      client.query('BEGIN')
      await cb(client)
      client.query('COMMIT')
    } catch (e) {
      client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}

export default Model
