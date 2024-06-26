import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { lib } from '@airport/direction-indicator'
import { DatastructureUtils, Dictionary, SEQUENCE_GENERATOR } from '@airport/ground-control';
import { SynchronizationConflictDao } from "./dao/conflict/SynchronizationConflictDao";
import { SynchronizationConflictValuesDao } from "./dao/conflict/SynchronizationConflictValuesDao";
import { EntityRecordDao } from './dao/relation/EntityRecordDao'
import { CrossRepositoryRelationManager } from './manager/CrossRepositoryRelationManager'
import { RecordUpdateStageDao } from "./dao/RecordUpdateStageDao";
import { CopiedEntityQueryRecordDao } from './dao/relation/EntityQueryRecordDao';
import { CopiedEntityRecordReferenceDao } from './dao/relation/CopiedEntityRecordReferenceDao';

const layover = lib('@airport/layover')

layover.register(
    EntityRecordDao,
    CopiedEntityQueryRecordDao,
    CopiedEntityRecordReferenceDao,
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
    copiedEntityRecordDao: EntityRecordDao,
    copiedEntityRecordReferenceDao: CopiedEntityRecordReferenceDao,
    datastructureUtils: DatastructureUtils,
	dictionary: Dictionary,
	sequenceGenerator: SEQUENCE_GENERATOR,
})