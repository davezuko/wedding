import {Pool} from 'pg'

/* Singleton connection pool shared by all models */
const pool = new Pool()

class Model {
  constructor() {
    this._pool = pool
  }

  /**
   * Creates a connection in the current pool.
   */
  async connect() {
    return this._pool.connect()
  }

  /**
   * Runs a single query.
   */
  async query(...args) {
    return this._pool.query(...args)
  }

  /**
   * Runs a given routine within a transaction. If the routine throws, the
   * transaction is automatically rolled back.
   */
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
