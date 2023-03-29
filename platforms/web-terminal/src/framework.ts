import { IOC } from '@airport/direction-indicator'
import { initServer } from '@airport/server'
import { injectWebReceiver, WebMessageGateway } from './WebMessageGateway'

export async function initFramework() {
    injectWebReceiver()
    initServer()
    await IOC.get(WebMessageGateway)
}
