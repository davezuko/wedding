import app from '../server/main'

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)

  if (typeof process.send === 'function') {
    console.log('Server ready')
    process.send('ready')
  }
})

process.on('SIGINT', () => {
  console.log('Closing server...')
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})
