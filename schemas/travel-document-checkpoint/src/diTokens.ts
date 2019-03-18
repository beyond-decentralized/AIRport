import {diToken}      from '@airport/di'
import {ITerminalDao} from './dao/TerminalDao'
import {IUserDao}     from './dao/UserDao'

export const TERMINAL_DAO = diToken<ITerminalDao>()
export const USER_DAO     = diToken<IUserDao>()