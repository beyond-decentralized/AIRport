
import { lib } from '@airport/direction-indicator'
import { IApplicationLoader } from './isolate/ApplicationLoader'
import { ILocalAPIServer } from './isolate/LocalApiServer'
import { ApplicationStore } from './state/ApplicationStore'
import { SelectorManager } from './state/Selector'

const apron = lib('apron')

apron.register(ApplicationStore, SelectorManager)

export const APPLICATION_LOADER = apron.token<IApplicationLoader>('ApplicationLoader')
export const LOCAL_API_SERVER = apron.token<ILocalAPIServer>('LocalAPIServer')

/**
 * Used by Apps (in App VMs) to set App-specific ApplicationLoader
 * 
 * @param applicationLoader Application specific ApplicationLoader
 */
export function setApplicationLoader(
    applicationLoader: { new(): IApplicationLoader }
) {
    APPLICATION_LOADER.setClass(applicationLoader)
}
