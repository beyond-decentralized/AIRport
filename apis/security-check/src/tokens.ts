
import { lib } from '@airport/di'
import { IApplicationInitializer } from './isolate/ApplicationInitializer'
import { ILocalAPIServer } from './isolate/LocalApiServer'

const checkIn = lib('security-check')

export const APPLICATION_INITIALIZER = checkIn.token<IApplicationInitializer>('IApplicationInitializer')
export const LOCAL_API_SERVER = checkIn.token<ILocalAPIServer>('ILocalAPIServer')