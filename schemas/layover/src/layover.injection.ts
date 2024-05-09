import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { lib } from '@airport/direction-indicator'
import { DatastructureUtils, Dictionary, SEQUENCE_GENERATOR } from '@airport/ground-control';
import { SynchronizationConflictDao } from "./dao/conflict/SynchronizationConflictDao";
import { SynchronizationConflictValuesDao } from "./dao/conflict/SynchronizationConflictValuesDao";
import { CopiedEntityRecordDao } from './dao/relation/CopiedEntityRecordDao'
import { CopiedEntityRepositoryRecordDao } from './dao/relation/CopiedEntityRepositoryRecordDao'
import { CrossRepositoryRelationManager } from './manager/CrossRepositoryRelationManager'
import { RecordUpdateStageDao } from "./dao/RecordUpdateStageDao";
import { CopiedEntityQueryRecordDao } from './dao/relation/CopiedEntityQueryRecordDao';

const layover = lib('@airport/layover')

layover.register(
    CopiedEntityRecordDao,
    CopiedEntityRepositoryRecordDao,
    CopiedEntityQueryRecordDao,
    CrossRepositoryRelationManager,
    RecordUpdateStageDao,
    SynchronizationConflictDao,
    SynchronizationConflictValuesDao
)

layover.setDependencies(RecordUpdateStageDao, {
	airportDatabase: AIRPORT_DATABASE,
	dictionary: Dictionary
})
layover.setDependencies(CrossRepositoryRelationManager, {
    copiedEntityQueryRecordDao: CopiedEntityQueryRecordDao,
    copiedEntityRecordDao: CopiedEntityRecordDao,
    copiedEntityRepositoryRecordDao: CopiedEntityRepositoryRecordDao,
    datastructureUtils: DatastructureUtils,
	dictionary: Dictionary,
	sequenceGenerator: SEQUENCE_GENERATOR,
})