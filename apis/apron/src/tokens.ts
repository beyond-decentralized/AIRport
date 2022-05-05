
import { API_REGISTRY } from '@airport/check-in'
import { lib } from '@airport/direction-indicator'
import { IApplicationLoader } from './isolate/ApplicationLoader'
import { ILocalAPIServer } from './isolate/LocalApiServer'
import { ApplicationStore, IApplicationStore } from './state/ApplicationStore'

const apron = lib('apron')
apron.autopilot = false

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

LOCAL_API_SERVER.setDependencies({
    apiRegistry: API_REGISTRY
})