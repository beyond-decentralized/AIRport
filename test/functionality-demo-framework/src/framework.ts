import { IOC } from '@airport/di'
import { TRANSACTIONAL_RECEIVER } from '@airport/terminal-map'
import { injectTransactionalReceiver } from '@airport/web-terminal'
import { startDb } from '@airport/websql'

injectTransactionalReceiver()

export async function initFramework() {
    await startDb('functionality_demo')
    await IOC.get(TRANSACTIONAL_RECEIVER)
}