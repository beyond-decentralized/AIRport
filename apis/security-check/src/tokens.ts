
import { lib } from '@airport/di'
import { IApplicationLoader } from './isolate/ApplicationLoader'
import { ILocalAPIServer } from './isolate/LocalApiServer'

const checkIn = lib('security-check')

export const APPLICATION_LOADER = checkIn.token<IApplicationLoader>('IApplicationLoader')
export const LOCAL_API_SERVER = checkIn.token<ILocalAPIServer>('ILocalAPIServer')