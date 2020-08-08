import Bluebird from 'bluebird'

export default ({ queueClient, queueClientError, Logger }) => {
  const antidoteQueueHandler = ({ receivedMessageItems: [message] }) => {
    if (!message) {
      Logger.warn('There is no poison, because this message is empty 📭')
      return Bluebird.resolve()
    }

    const { messageId, popReceipt, messageText } = message

    Logger.info('💉 Applying antidote...')

    return Bluebird.all([
      queueClientError.deleteMessage(messageId, popReceipt),
      queueClient.sendMessage(messageText)
    ])
  }

  return { antidoteQueueHandler }
}
