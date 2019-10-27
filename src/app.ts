import express = require('express')
import * as gitlabController from './controllers/gitlab'

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
app.post('/gitlab/events', gitlabController.events)

export default app
