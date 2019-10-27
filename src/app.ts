import express = require('express')

// Create Express server.
const app: express.Application = express()

// Express configuration.
app.set('port', process.env.PORT || 3000)

/**
 * API routes.
 */
app.get('/ping', (_req, res) => {
  res.json('pong')
})

export default app
