import { IOC } from '@airport/di'
import { TRANSACTIONAL_RECEIVER } from '@airport/terminal-map'
import { injectTransactionalReceiver } from '@airport/web-terminal'
import { startDb } from '@airport/sqljs'
import { messages } from './store'

injectTransactionalReceiver()

let allMessages = []

export async function initFramework() {
    await startDb('functionality_demo')
    const transactionalReceiver = await IOC.get(TRANSACTIONAL_RECEIVER)
    transactionalReceiver.onMessage((message) => {
        allMessages.push(message)
        messages.set(allMessages)
    })
}