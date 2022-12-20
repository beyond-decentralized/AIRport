import { IOC } from '@airport/direction-indicator'
import { CrossTabCommunicator } from './CrossTabCommunicator'

export * from './CrossTabCommunicator'
export * from './injection'

IOC.getSync(CrossTabCommunicator)
