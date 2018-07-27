import fs from 'fs'
import path from 'path'
import parse from 'csv-parse/lib/sync'
import {fromGoogleSheets} from './transforms'

const CSV_FILE = path.resolve(__dirname, '../../../Downloads/guest-list.csv')

const rows = parse(fs.readFileSync(CSV_FILE, 'utf8'), {
  columns: true,
}).map(fromGoogleSheets)

const out = [
  Object.keys(rows[0]).join(','),
  ...rows.map(row => Object.values(row).join(',')),
].join('\n')

fs.writeFileSync('./dist/guests.csv', out, 'utf8')
console.log({rows, out})
