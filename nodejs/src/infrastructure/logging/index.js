import { createLogger, transports } from 'winston'
import { combineLogFormats } from './format-levels'

const Logger = createLogger({
  level: 'info',
  defaultMeta: {
    projectLabel: '🧪 Antidote Worker'
  },
  exitOnError: false,
  transports: [
    new transports.Console({
      format: combineLogFormats()
    })
  ]
})

export { Logger }
