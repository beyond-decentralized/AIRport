import { Injected } from "@airport/direction-indicator"
import { AirEntityId } from "@airport/final-approach"
import { DdlEntity } from "@airport/airspace/dist/app/bundle"
import { Repository } from "@airport/holding-pattern/dist/app/bundle"
import { CopiedEntityRecord, CopiedEntityRecordRepository } from "../ddl/ddl"

export interface ICrossRepositoryRelationManager {

    addCopiedEntityRecord(
        copiedEntity: AirEntityId,
        copyDdlEntity: DdlEntity,
        repositoryWithCopy: Repository
    ): CopiedEntityRecord

    addCopiedEntityRecordRepository(
        copiedEntityRecord: CopiedEntityRecord,
        repositoryWithCopy: Repository
    ): CopiedEntityRecordRepository

}

@Injected()
export class CrossRepositoryRelationManager
    implements ICrossRepositoryRelationManager {

    addCopiedEntityRecord(
        copiedEntity: AirEntityId,
        copyDdlEntity: DdlEntity,
        repositoryWithCopy: Repository
    ): CopiedEntityRecord {
        const copiedEntityRecord = new CopiedEntityRecord()
        copiedEntityRecord._actorRecordId = copiedEntity._actorRecordId
        copiedEntityRecord.actor = copiedEntityRecord.actor
        copiedEntityRecord.repository = copiedEntityRecord.repository
        copiedEntityRecord.copyDdlEntity = copyDdlEntity

        this.addCopiedEntityRecordRepository(
            copiedEntityRecord,
            repositoryWithCopy
        )

        return copiedEntityRecord
    }

    addCopiedEntityRecordRepository(
        copiedEntityRecord: CopiedEntityRecord,
        repositoryWithCopy: Repository
    ): CopiedEntityRecordRepository {
        const copiedEntityRecordRepository = new CopiedEntityRecordRepository()
        copiedEntityRecordRepository.copiedEntityRecord = copiedEntityRecord
        copiedEntityRecordRepository.repositoryWithCopy = repositoryWithCopy

        copiedEntityRecord.copiedEntityRecordRepositories.push(copiedEntityRecordRepository)

        return copiedEntityRecordRepository
    }

}
