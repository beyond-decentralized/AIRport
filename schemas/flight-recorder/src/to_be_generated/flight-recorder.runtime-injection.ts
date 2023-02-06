import { app } from '@airport/direction-indicator'
import { CrossRepositoryRelationManager } from '../manager/CrossRepositoryRelationManager'
import { application } from './app-declaration'
import { CopiedRecordLedgerDao, LocalCopyReplacementLedgerDao, CrossRepositoryRelationLedgerDao } from './flight-recorder.runtime-index'

export const flightRecorder = app(application)

flightRecorder.register(
    CopiedRecordLedgerDao,
    LocalCopyReplacementLedgerDao,
    CrossRepositoryRelationLedgerDao,
    CrossRepositoryRelationManager
)
