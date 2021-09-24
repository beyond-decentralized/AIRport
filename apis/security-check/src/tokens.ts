
import { lib } from '@airport/di'
import { IApplicationInitializer } from './ApplicationInitializer'

const checkIn = lib('security-check')

export const APPLICATION_INITIALIZER = checkIn.token<IApplicationInitializer>('IApplicationInitializer')