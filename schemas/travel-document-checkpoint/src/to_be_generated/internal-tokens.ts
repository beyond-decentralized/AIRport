import { ITerminalDao } from '../dao/TerminalDao'
import { IUserDao } from '../dao/UserDao'
import { 
    travelDocumentCheckpoint, 
    USER_API 
} from './api-tokens'

export const TERMINAL_DAO = travelDocumentCheckpoint.token<ITerminalDao>('TERMINAL_DAO')
export const USER_DAO = travelDocumentCheckpoint.token<IUserDao>('USER_DAO')

USER_API.IDependencyInjectionToken({
    userDao: USER_DAO
})
