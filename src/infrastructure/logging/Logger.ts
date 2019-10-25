import * as pino from 'pino'

export default pino({
  level: 'debug',
  name: 'piar',
  prettyPrint: { colorize: true },
})
