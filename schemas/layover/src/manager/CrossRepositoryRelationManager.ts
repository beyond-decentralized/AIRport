import { Inject, Injected } from "@airport/direction-indicator"
import { AirEntityId } from "@airport/final-approach"
import { DdlEntity } from "@airport/airspace/dist/app/bundle"
import { Repository } from "@airport/holding-pattern/dist/app/bundle"
import { ActorRecordId, Actor_LocalId, DbEntity, DbEntity_LocalId, Dictionary, IAirEntity, IEntityRecordAdditionsForRepository, IDatastructureUtils, ISequenceGenerator, Repository_LocalId } from "@airport/ground-control"
import { CopiedEntityQueryRecordDao } from "../dao/relation/EntityQueryRecordDao"
import { EntityRecordDao } from "../dao/relation/EntityRecordDao"
import { EntityRecordRepositoryReferenceDao } from "../dao/relation/EntityRecordRepositoryReferenceDao"
import { EntityRecord, EntityRecordRepositoryReference } from "../ddl/ddl"
import { EntityRelationRecord } from "../ddl/relation/EntityRelationRecord"

export interface ICrossRepositoryRelationManager {

    addEntityRecords(
        entityRecordAdditionsPerRepository: IEntityRecordAdditionsForRepository[]
    ): Promise<EntityRecord>

    addEntityRecordRepositoryReference(
        entityRelationRecord: EntityRelationRecord,
        referencingRepository: Repository
    ): EntityRecordRepositoryReference

    getRecords(
        entities: IAirEntity[][],
        dbEntities: DbEntity[]
    ): Promise<EntityRecord[]>

}

@Injected()
export class CrossRepositoryRelationManager
    implements ICrossRepositoryRelationManager {

    @Inject()
    copiedEntityQueryRecordDao: CopiedEntityQueryRecordDao

    @Inject()
    entityRecordDao: EntityRecordDao

    @Inject()
    entityRecordRepositoryReferenceDao: EntityRecordRepositoryReferenceDao
    
    @Inject()
    datastructureUtils: IDatastructureUtils

    @Inject()
    dictionary: Dictionary

    @Inject()
    sequenceGenerator: ISequenceGenerator

    async addEntityRecords(
        entityRecordAdditionsPerRepository: IEntityRecordAdditionsForRepository[]
    ): Promise<EntityRecord> {

        const entityRecords: EntityRecord[] = []
        /*
        A number of repositories are going to get synced-in at the same time.  They may
        have a number of copied records in them, all of the copies will be sent into
        this method, grouped by the DDL entity and further grouped by the Repository
        that has the copies.

        As a result of this method the records that are indeed copies will be de-dupped
        and recorded as such.  The most recent copies of records will be returned
        back for persistence

	// Id Properties
	_actorRecordId?: ActorRecordId;

	// Id Relations
	actor?: IActor;
	repository: IRepository;
        */
        const entityRecordMap: Map<DbEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,ActorRecordId[]>>> = new Map()
        for (const entityRecordAdditionsForRepository of entityRecordAdditionsPerRepository) {
            for (let i = 0; i < entityRecordAdditionsForRepository.ddlEntities.length; i++) {
                const ddlEntity = entityRecordAdditionsForRepository.ddlEntities.length[i]
                const entities = entityRecordAdditionsForRepository.entities.length[i]
                const entityRecord = this.getEntityRecord(entities, ddlEntity)

					// const applicationActorMapForDomain = this.datastructureUtils.ensureChildJsMap(
					// 	this.datastructureUtils.ensureChildJsMap(
                    //         this.datastructureUtils.ensureChildJsMap(),entities.repository._localId),
                    //     ddlEntity._localId)
                entityRecords.push(entityRecord)
            }
        }

        // this.getCopiedEntityRepositoryRecord(
        //     entityRecord,
        //     referencingRepository
        // )

        // return entityRecord

        return null
    }

    addEntityRecordRepositoryReference(
        entityRelationRecord: EntityRelationRecord,
        referencingRepository: Repository
    ): EntityRecordRepositoryReference {
        const repositoryReference = new EntityRecordRepositoryReference()
        repositoryReference.entityRelationRecord = entityRelationRecord
        repositoryReference.referencingRepository = referencingRepository

        entityRelationRecord.referencedRecord.repositoryReferences.push(repositoryReference)

        return repositoryReference
    }

    async getRecords(
        entities: IAirEntity[][],
        dbEntities: DbEntity[]
    ): Promise<EntityRecord[]> {

        const airport = this.dictionary.airport
        const EntityQuery = airport.apps.LAYOVER.entities.EntityQuery

        const SystemWideOperationId = this.dictionary.SystemWideOperationId
        const queryNumber = await this.sequenceGenerator
            .generateSequenceNumbersForColumn(
                airport.DOMAIN_NAME,
                airport.apps.LAYOVER.name,
                EntityQuery.name,
                EntityQuery.columns.ID,
                1
            );

        for (let i = 0; i < entities.length; i++) {
            let entitiesForTable = entities[i];
            let table = dbEntities[i];
        }



        return null;
    }

    private getEntityRecord(
        copiedEntity: AirEntityId,
        copyDdlEntity: DdlEntity
    ): EntityRecord {
        const entityRecord = new EntityRecord()
        entityRecord._actorRecordId = copiedEntity._actorRecordId
        entityRecord.actor = entityRecord.actor
        entityRecord.repository = entityRecord.repository
        entityRecord.ddlEntity = copyDdlEntity

        return entityRecord
    }

    private getCopiedEntityRepositoryRecord(
        entityRelationRecord: EntityRelationRecord,
        repositoryWithCopy: Repository
    ): EntityRecordRepositoryReference {
        const entityRecordRepositoryReference = new EntityRecordRepositoryReference()
        entityRecordRepositoryReference.entityRelationRecord = entityRelationRecord
        entityRecordRepositoryReference.referencingRepository = repositoryWithCopy

        entityRelationRecord.referencedRecord.repositoryReferences.push(entityRecordRepositoryReference)

        return entityRecordRepositoryReference
    }

}
