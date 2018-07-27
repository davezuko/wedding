import fs from 'fs'
import path from 'path'
import {createLogger, format, transports} from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const LOGS_DIR = path.resolve(__dirname, '../../logs')

if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR)
}

const logger = createLogger({
  format: format.combine(format.timestamp(), format.prettyPrint()),
  transports: [
    new DailyRotateFile({
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      dirname: LOGS_DIR,
    }),
    new transports.File({
      filename: path.resolve(LOGS_DIR, 'error.log'),
      level: 'error',
    }),
  ],
})

export default logger
