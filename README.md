# 🧪 Antidote

> Antidote aims to retrieve messages from the error queue and put them back in the main queue.

| Statements                                    | Branches                                  | Functions                                   | Lines                               |
| --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- | ----------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") |

![](https://i.imgur.com/peHrHh7.jpg)


## Summary

This application was developed due to the need to recover messages that fell in the error queue or as we know metaphorically by "poisoned queue", just add the following variables in the `.env`:
  * accessKey
  * secretKey
  * region
  * storageAccountName
  * storageAccountKey
  * queueName
  * queueErrorName

In the current context we are using * Azure * queues, but because it is an uncoupled architecture and code design, just change or add the new queue in `src/infrastructure/storage`.

