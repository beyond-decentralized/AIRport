import { AIRPORT_DATABASE } from '@airport/air-traffic-control'
import { app } from '@airport/direction-indicator'
import { Dictionary, SEQUENCE_GENERATOR } from '@airport/ground-control'
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

travelDocumentCheckpoint.setDependencies(TerminalDao, {
    airportDatabase: AIRPORT_DATABASE,
    dictionary: Dictionary,
    sequenceGenerator: SEQUENCE_GENERATOR
})

travelDocumentCheckpoint.setDependencies(UserAccountApi, {
    userAccountDao: UserAccountDao
})

travelDocumentCheckpoint.setDependencies(UserAccountDao, {
    airportDatabase: AIRPORT_DATABASE,
    dictionary: Dictionary,
    sequenceGenerator: SEQUENCE_GENERATOR
})

travelDocumentCheckpoint.setDependencies(UserAccountManager, {
    userAccountDao: UserAccountDao
})
