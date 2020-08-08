/* istanbul ignore file */
import { format } from 'winston'

const {
  splat,
  printf,
  combine,
  colorize,
  timestamp
} = format

const colors = () => colorize({
  all: true,
  colors: Object.freeze({
    trace: 'green',
    info: 'blue',
    warn: 'yellow',
    error: 'red',
    fatal: 'red'
  })
})

const upperCaseLevel = format(info => {
  info.level = info.level.toUpperCase()
  return info
})

const customFormat = () => printf(({ level, message, timestamp, projectLabel }) =>
      `[${timestamp}] ${level} - [${projectLabel}]: ${message}`
)

const combineLogFormats = (...formats) => combine(
  upperCaseLevel(),
  timestamp(),
  splat(),
  colors(),
  customFormat(),
  ...formats
)

export {
  combineLogFormats
}
