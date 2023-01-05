import { app } from '@airport/direction-indicator'
import { application } from './app-declaration'
import { CopiedRecordLedgerDao, ManyToOneLedgerDao, OneToManyLedgerDao } from './runtime-index'

export const flightRecorder = app(application)

flightRecorder.register(
    CopiedRecordLedgerDao,
    ManyToOneLedgerDao,
    OneToManyLedgerDao
)
