
import { lib } from '@airport/direction-indicator'
import { IApplicationLoader } from './isolate/ApplicationLoader'
import { ILocalAPIServer } from './isolate/LocalApiServer'
import { ApplicationStore } from './state/ApplicationStore'
import { SelectorManager } from './state/Selector'

const apron = lib('apron')

apron.register(ApplicationStore, SelectorManager)

export const APPLICATION_LOADER = apron.token<IApplicationLoader>('ApplicationLoader')
export const LOCAL_API_SERVER = apron.token<ILocalAPIServer>('LocalAPIServer')
