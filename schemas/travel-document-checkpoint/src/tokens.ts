import { lib } from '@airport/di'
import { IUserApi } from './api/UserApi'
import { ITerminalDao } from './dao/TerminalDao'
import { IUserDao } from './dao/UserDao'

const travelDocumentCheckpoint = lib('travel-document-checkpoint')

export const TERMINAL_DAO = travelDocumentCheckpoint.token<ITerminalDao>('ITerminalDao')
export const USER_API = travelDocumentCheckpoint.token<IUserApi>('IUserApi')
export const USER_DAO = travelDocumentCheckpoint.token<IUserDao>('IUserDao')
