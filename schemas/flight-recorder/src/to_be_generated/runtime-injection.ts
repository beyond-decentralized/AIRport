import { app } from '@airport/direction-indicator'
import { CrossRepositoryRelationManager } from '../manager/CrossRepositoryRelationManager'
import { application } from './app-declaration'
import { CopiedRecordLedgerDao, LocalCopyReplacementLedgerDao, CrossRepositoryRelationLedgerDao } from './runtime-index'

export const flightRecorder = app(application)

flightRecorder.register(
    CopiedRecordLedgerDao,
    LocalCopyReplacementLedgerDao,
    CrossRepositoryRelationLedgerDao,
    CrossRepositoryRelationManager
)
