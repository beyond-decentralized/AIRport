import { lib } from '@airport/di'
import { ITerminalDao } from '../dao/TerminalDao'
import { IUserDao } from '../dao/UserDao'
import { USER_API } from './tokens'

// Easier to define in each of tokens files, for understandability
export const travelDocumentCheckpoint = lib('travel-document-checkpoint')

export const TERMINAL_DAO = travelDocumentCheckpoint.token<ITerminalDao>('TERMINAL_DAO')
export const USER_DAO = travelDocumentCheckpoint.token<IUserDao>('USER_DAO')

USER_API.setDependencies({
    userDao: USER_DAO
})