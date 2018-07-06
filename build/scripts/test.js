import parse from 'csv-parse'
import through2 from 'through2'
import {theKnotToFirebaseRecord} from './transforms'

process.stdin
  .pipe(parse({columns: true}))
  .pipe(
    through2.obj(function(obj, enc, cb) {
      const firebaseRecord = theKnotToFirebaseRecord(obj)
      this.push(JSON.stringify(firebaseRecord))
      cb()
    })
  )
  .pipe(process.stdout)
