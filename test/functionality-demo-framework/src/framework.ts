import { IOC } from '@airport/di'
import { TRANSACTIONAL_RECEIVER } from '@airport/terminal-map'
import { injectTransactionalReceiver } from '@airport/web-terminal'
import { startDb } from '@airport/websql'
import { SCHEMA } from '@airport/functionality-demo-schema/lib/generated/schema'

injectTransactionalReceiver()

export async function initFramework() {
    await startDb('functionality_demo', SCHEMA as any)
    await IOC.get(TRANSACTIONAL_RECEIVER)
}