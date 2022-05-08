import { IOC } from '@airport/direction-indicator'
import { injectTransactionalReceiver, WEB_MESSAGE_RECEIVER } from '@airport/web-terminal'
import { startDb } from '@airport/sqljs'

injectTransactionalReceiver()

export async function initFramework() {
    await startDb('AIRportA-demo-demo-demo-functionalty')
    await IOC.get(WEB_MESSAGE_RECEIVER)
}