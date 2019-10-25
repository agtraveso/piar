import express = require('express')
import logger from './infrastructure/logging/Logger'

// Create a new express application instance
const app: express.Application = express()

const port = process.env.PORT || 3000

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.listen(port, () => {
  logger.info(
    `  App is running at http://localhost:${port} in ${process.env.NODE_ENV} mode`,
  )
  logger.info('  Press CTRL-C to stop\n')
})
