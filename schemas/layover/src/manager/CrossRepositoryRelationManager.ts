import { Inject, Injected } from "@airport/direction-indicator"
import { AirEntityId } from "@airport/final-approach"
import { DdlEntity } from "@airport/airspace/dist/app/bundle"
import { Repository } from "@airport/holding-pattern/dist/app/bundle"
import { ActorRecordId, Actor_LocalId, DbEntity, DbEntity_LocalId, Dictionary, IAirEntity, ICopiedEntityRecordAdditionsForRepository, IDatastructureUtils, ISequenceGenerator, Repository_LocalId } from "@airport/ground-control"
import { CopiedEntityQueryRecordDao } from "../dao/relation/CopiedEntityQueryRecordDao"
import { CopiedEntityRecordDao } from "../dao/relation/CopiedEntityRecordDao"
import { CopiedEntityRepositoryRecordDao } from "../dao/relation/CopiedEntityRepositoryRecordDao"
import { CopiedEntityRecord, CopiedEntityRepositoryRecord } from "../ddl/ddl"

export interface ICrossRepositoryRelationManager {

    addCopiedEntityRecords(
        copiedEntityRecordAdditionsPerRepository: ICopiedEntityRecordAdditionsForRepository[]
    ): Promise<CopiedEntityRecord>

    addCopiedEntityRepositoryRecord(
        copiedEntityRecord: CopiedEntityRecord,
        repositoryWithCopy: Repository
    ): CopiedEntityRepositoryRecord

    getCopiedRecords(
        entities: IAirEntity[][],
        dbEntities: DbEntity[]
    ): Promise<CopiedEntityRecord[]>

}

@Injected()
export class CrossRepositoryRelationManager
    implements ICrossRepositoryRelationManager {

    @Inject()
    copiedEntityQueryRecordDao: CopiedEntityQueryRecordDao

    @Inject()
    copiedEntityRecordDao: CopiedEntityRecordDao

    @Inject()
    copiedEntityRepositoryRecordDao: CopiedEntityRepositoryRecordDao
    
    @Inject()
    datastructureUtils: IDatastructureUtils

    @Inject()
    dictionary: Dictionary

    @Inject()
    sequenceGenerator: ISequenceGenerator

    async addCopiedEntityRecords(
        copiedEntityRecordAdditionsPerRepository: ICopiedEntityRecordAdditionsForRepository[]
    ): Promise<CopiedEntityRecord> {

        const copiedEntityRecords: CopiedEntityRecord[] = []
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
        const copiedEntityRecordMap: Map<DbEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,ActorRecordId[]>>> = new Map()
        for (const copiedEntityRecordAdditionsForRepository of copiedEntityRecordAdditionsPerRepository) {
            for (let i = 0; i < copiedEntityRecordAdditionsForRepository.ddlEntities.length; i++) {
                const ddlEntity = copiedEntityRecordAdditionsForRepository.ddlEntities.length[i]
                const entities = copiedEntityRecordAdditionsForRepository.entities.length[i]
                const copiedEntityRecord = this.getCopiedEntityRecord(entities, ddlEntity, copiedEntityRecordAdditionsForRepository.repository)

					// const applicationActorMapForDomain = this.datastructureUtils.ensureChildJsMap(
					// 	this.datastructureUtils.ensureChildJsMap(
                    //         this.datastructureUtils.ensureChildJsMap(),entities.repository._localId),
                    //     ddlEntity._localId)
                copiedEntityRecords.push(copiedEntityRecord)
            }
        }

        // this.getCopiedEntityRepositoryRecord(
        //     copiedEntityRecord,
        //     repositoryWithCopy
        // )

        // return copiedEntityRecord

        return null
    }

    addCopiedEntityRepositoryRecord(
        copiedEntityRecord: CopiedEntityRecord,
        repositoryWithCopy: Repository
    ): CopiedEntityRepositoryRecord {
        const copiedEntityRepositoryRecord = new CopiedEntityRepositoryRecord()
        copiedEntityRepositoryRecord.copiedEntityRecord = copiedEntityRecord
        copiedEntityRepositoryRecord.repositoryWithCopy = repositoryWithCopy

        copiedEntityRecord.copiedEntityRecordRepositories.push(copiedEntityRepositoryRecord)

        return copiedEntityRepositoryRecord
    }

    async getCopiedRecords(
        entities: IAirEntity[][],
        dbEntities: DbEntity[]
    ): Promise<CopiedEntityRecord[]> {

        const airport = this.dictionary.airport
        const CopiedEntityQuery = airport.apps.LAYOVER.entities.CopiedEntityQuery

        const SystemWideOperationId = this.dictionary.SystemWideOperationId
        const queryNumber = await this.sequenceGenerator
            .generateSequenceNumbersForColumn(
                airport.DOMAIN_NAME,
                airport.apps.LAYOVER.name,
                CopiedEntityQuery.name,
                CopiedEntityQuery.columns.ID,
                1
            );

        for (let i = 0; i < entities.length; i++) {
            let entitiesForTable = entities[i];
            let table = dbEntities[i];
        }



        return null;
    }

    private getCopiedEntityRecord(
        copiedEntity: AirEntityId,
        copyDdlEntity: DdlEntity,
        repositoryWithCopy: Repository
    ): CopiedEntityRecord {
        const copiedEntityRecord = new CopiedEntityRecord()
        copiedEntityRecord._actorRecordId = copiedEntity._actorRecordId
        copiedEntityRecord.actor = copiedEntityRecord.actor
        copiedEntityRecord.repository = copiedEntityRecord.repository
        copiedEntityRecord.copyDdlEntity = copyDdlEntity

        this.getCopiedEntityRepositoryRecord(
            copiedEntityRecord,
            repositoryWithCopy
        )

        return copiedEntityRecord
    }

    private getCopiedEntityRepositoryRecord(
        copiedEntityRecord: CopiedEntityRecord,
        repositoryWithCopy: Repository
    ): CopiedEntityRepositoryRecord {
        const copiedEntityRepositoryRecord = new CopiedEntityRepositoryRecord()
        copiedEntityRepositoryRecord.copiedEntityRecord = copiedEntityRecord
        copiedEntityRepositoryRecord.repositoryWithCopy = repositoryWithCopy

        copiedEntityRecord.copiedEntityRecordRepositories.push(copiedEntityRepositoryRecord)

        return copiedEntityRepositoryRecord
    }

}
