import { QueueServiceClient, StorageSharedKeyCredential } from '@azure/storage-queue'
import { antidote } from '@antidote/config'

const queueSvc = new QueueServiceClient(`https://${antidote.storageAccountName}.queue.core.windows.net`,
  new StorageSharedKeyCredential(antidote.storageAccountName, antidote.storageAccountKey)
)

const queueClient = queueSvc.getQueueClient(antidote.queueName)
const queueClientError = queueSvc.getQueueClient(antidote.queueErrorName)

export { queueClient, queueClientError }
