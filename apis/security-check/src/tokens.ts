
import { lib } from '@airport/di'
import { IApplicationLoader } from './isolate/ApplicationLoader'
import { ILocalAPIServer } from './isolate/LocalApiServer'

const checkIn = lib('security-check')

export const APPLICATION_LOADER = checkIn.token<IApplicationLoader>('APPLICATION_LOADER')
export const LOCAL_API_SERVER = checkIn.token<ILocalAPIServer>('LOCAL_API_SERVER')