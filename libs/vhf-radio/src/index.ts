import { IOC } from '@airport/direction-indicator'
import { CROSS_TAB_COMMUNCATOR } from './tokens'

export * from './CrossTabCommunicator'
export * from './tokens'

IOC.getSync(CROSS_TAB_COMMUNCATOR)
