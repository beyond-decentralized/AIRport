
import { API_REGISTRY } from '@airport/check-in'
import { lib } from '@airport/direction-indicator'
import { IApplicationLoader } from './isolate/ApplicationLoader'
import { ILocalAPIServer } from './isolate/LocalApiServer'
import { ApplicationStore, IApplicationStore } from './state/ApplicationStore'
import { ISelectorManager, SelectorManager } from './state/Selector'

const apron = lib('apron')

export const APPLICATION_LOADER = apron.token<IApplicationLoader>({
    class: null,
    interface: 'IApplicationLoader',
    token: 'APPLICATION_LOADER'
})
export const APPLICATION_STORE = apron.token<IApplicationStore>({
    class: ApplicationStore,
    interface: 'IApplicationStore',
    token: 'APPLICATION_STORE'
})
export const LOCAL_API_SERVER = apron.token<ILocalAPIServer>({
    class: null,
    interface: 'ILocalAPIServer',
    token: 'LOCAL_API_SERVER'
})
export const SELECTOR_MANAGER = apron.token<ISelectorManager>({
    class: SelectorManager,
    interface: 'ISelectorManager',
    token: 'SELECTOR_MANAGER'
})