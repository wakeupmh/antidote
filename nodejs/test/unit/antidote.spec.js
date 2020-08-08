/* eslint-disable no-undef */

import sinon from 'sinon'
import Bluebird from 'bluebird'
import { antidoteServiceFactory } from '@antidote/antidote'

describe('🧪 Antidote Worker - Unit Test', () => {
  let queueClientError, queueClient, Logger
  sinon.usingPromise(Bluebird)

  beforeEach(() => {
    queueClientError = {
      deleteMessage: sinon.stub().resolves()
    }
    queueClient = {
      sendMessage: sinon.stub().resolves()
    }
    Logger = {
      info: sinon.spy(),
      warn: sinon.spy()
    }
  })

  context('Antidote Service Tests 🧫 ', () => {
    it('shouldn\'t process message', async () => {
      const antidoteService = antidoteServiceFactory({
        queueClient, queueClientError, Logger
      })

      await antidoteService.antidoteQueueHandler({ receivedMessageItems: [] })

      sinon.assert.notCalled(queueClientError.deleteMessage)
      sinon.assert.notCalled(queueClient.sendMessage)
      sinon.assert.calledWith(Logger.warn, 'There is no poison, because this message is empty 📭')
    })

    it('should apply antidote 💉', async () => {
      const antidoteService = antidoteServiceFactory({
        queueClient, queueClientError, Logger
      })

      await antidoteService.antidoteQueueHandler(
        {
          receivedMessageItems: [{
            messageId: 1,
            popReceipt: 'xpto',
            messageText: 'Just a poisoned test 🤢'
          }]
        }
      )

      sinon.assert.calledOnce(queueClientError.deleteMessage)
      sinon.assert.calledOnce(queueClient.sendMessage)
      sinon.assert.calledWith(Logger.info, '💉 Applying antidote...')
    })
  })
})
