import Bluebird from 'bluebird'
import {
  Logger,
  queueClient,
  queueClientError
} from '@antidote/infrastructure'
import { antidoteServiceFactory } from '@antidote/antidote'

const antidoteService = antidoteServiceFactory({ queueClient, queueClientError, Logger })

const wait = item => {
  if (item) {
    return Bluebird.delay(500)
  }
  return Bluebird.resolve()
}

const poolingQueue = () => {
  return Bluebird.resolve(queueClientError.receiveMessages())
    .tap(() => Logger.info('Receiving poisoned messages 🤒🤢'))
    .then(antidoteService.antidoteQueueHandler)
    .tap(antidoteApplied => {
      if (antidoteApplied) { Logger.info('Antidote applied with success 🤩🎉') }
    })
    .tap(wait)
    .then(poolingQueue)
}

poolingQueue()
