import {system}      from '@airport/di'
import {ITerminalDao} from './dao/TerminalDao'
import {IUserDao}     from './dao/UserDao'

const travelDocumentCheckpoint = system('airport').lib('travel-document-checkpoint')

export const TERMINAL_DAO = travelDocumentCheckpoint.token<ITerminalDao>('ITerminalDao')
export const USER_DAO     = travelDocumentCheckpoint.token<IUserDao>('IUserDao')
