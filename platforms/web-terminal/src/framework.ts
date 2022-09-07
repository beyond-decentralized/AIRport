import { IOC } from '@airport/direction-indicator'
import { initServer } from '@airport/server'
import { WEB_MESSAGE_RECEIVER } from './tokens'
import { injectWebReceiver } from './WebMessageReceiver'

export async function initFramework() {
    injectWebReceiver()
    initServer()
    await IOC.get(WEB_MESSAGE_RECEIVER)
}
