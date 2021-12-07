import { IOC } from '@airport/di'
import { TRANSACTIONAL_RECEIVER } from '@airport/terminal-map'
import { injectTransactionalReceiver } from '@airport/web-terminal'
import { startDb } from '@airport/sqljs'

injectTransactionalReceiver()

export async function initFramework() {
    await startDb('AIRportA-demo-demo-demo-functionalty')
    await IOC.get(TRANSACTIONAL_RECEIVER)
}