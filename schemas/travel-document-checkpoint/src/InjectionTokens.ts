import {Token}        from 'typedi'
import {ITerminalDao} from './dao/TerminalDao'
import {IUserDao}     from './dao/UserDao'

export const TerminalDaoToken = new Token<ITerminalDao>()
export const UserDaoToken = new Token<IUserDao>()