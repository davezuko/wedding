import fs from 'fs'
import path from 'path'
import parseCSV from 'csv-parse/lib/sync'
import firebase from '../../js/services/firebase'

const [, , outFile] = process.argv

if (!outFile) {
  throw new Error(
    'An output filepath is required: yarn firebase-to-csv {path-to-csv-file}'
  )
}
