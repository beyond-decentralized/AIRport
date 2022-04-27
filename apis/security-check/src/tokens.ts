
import { API_REGISTRY } from '@airport/check-in'
import { lib } from '@airport/direction-indicator'
import { IApplicationLoader } from './isolate/ApplicationLoader'
import { ILocalAPIServer } from './isolate/LocalApiServer'

const checkIn = lib('security-check')

export const APPLICATION_LOADER = checkIn.token<IApplicationLoader>({
    class: null,
    interface: 'IApplicationLoader',
    token: 'APPLICATION_LOADER'
})
export const LOCAL_API_SERVER = checkIn.token<ILocalAPIServer>({
    class: null,
    interface: 'ILocalAPIServer',
    token: 'LOCAL_API_SERVER'
})

LOCAL_API_SERVER.setDependencies({
    apiRegistry: API_REGISTRY
})