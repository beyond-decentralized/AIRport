import { IContext, Injected } from "@airport/direction-indicator";
import { BaseRepositoryReferencingEntityRecordDao } from "../../generated/baseDaos";
import { Q_airport____at_airport_slash_layover } from '../../generated/qApplication'
import { QRepositoryReferencingEntityRecord } from '../../generated/qInterfaces'
import { RepositoryReferencingEntityRecord } from "../../ddl/relation/RepositoryReferencingEntityRecord";

@Injected()
export class RepositoryReferencingEntityRecordDao
    extends BaseRepositoryReferencingEntityRecordDao {

        async insert(
            repositoryReferencingEntityRecords: RepositoryReferencingEntityRecord[],
            context: IContext
        ): Promise<void> {
            let rrer: QRepositoryReferencingEntityRecord;
            const VALUES = []
            for (const repositoryReferencingEntityRecord of repositoryReferencingEntityRecords) {
                VALUES.push([
                    repositoryReferencingEntityRecord.entityRecord._actorRecordId,
                    repositoryReferencingEntityRecord.entityRecord.actor._localId,
                    repositoryReferencingEntityRecord.entityRecord.repository._localId,
                    repositoryReferencingEntityRecord.referencingRepository._localId
                ])
            }
            await this.db.insertValuesGenerateIds({
                INSERT_INTO: rrer = Q_airport____at_airport_slash_layover.CopiedEntityRepositoryRecord,
                columns: [
                    rrer.entityRecord._actorRecordId,
                    rrer.entityRecord.actor._localId,
                    rrer.entityRecord.repository._localId,
                    rrer.referencingRepository._localId
                ],
                VALUES
            }, context)
        }

}
