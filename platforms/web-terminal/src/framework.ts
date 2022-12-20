import { IOC } from '@airport/direction-indicator'
import { initServer } from '@airport/server'
import { injectWebReceiver, WebMessageReceiver } from './WebMessageReceiver'

export async function initFramework() {
    injectWebReceiver()
    initServer()
    await IOC.get(WebMessageReceiver)
}
