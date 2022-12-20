import { app } from '@airport/direction-indicator'
import { UserAccountApi } from '../api/UserAccountApi'
import { UserAccountManager } from '../core/UserAccountManager'
import { TerminalDao } from '../dao/TerminalDao'
import { UserAccountDao } from '../dao/UserAccountDao'
import { application } from './app-declaration'

export const travelDocumentCheckpoint = app(application)

travelDocumentCheckpoint.register(
    TerminalDao, UserAccountApi, UserAccountDao,
    UserAccountManager
)

travelDocumentCheckpoint.setDependencies(UserAccountApi, {
    userAccountDao: UserAccountDao
})

travelDocumentCheckpoint.setDependencies(UserAccountManager, {
    userAccountDao: UserAccountDao
})
