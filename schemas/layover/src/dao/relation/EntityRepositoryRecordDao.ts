import { IContext, Injected } from "@airport/direction-indicator";
import { BaseCopiedEntityRepositoryRecordDao } from "../../generated/baseDaos";
import { Q_airport____at_airport_slash_layover } from '../../generated/qApplication'
import { QCopiedEntityRepositoryRecord } from '../../generated/qInterfaces'
import { CopiedEntityRepositoryRecord } from "../../ddl/relation/CopiedEntityRepositoryRecord";

@Injected()
export class CopiedEntityRepositoryRecordDao
    extends BaseCopiedEntityRepositoryRecordDao {

        async insert(
            copiedEntityRepositoryRecords: CopiedEntityRepositoryRecord[],
            context: IContext
        ): Promise<void> {
            let ceqr: QCopiedEntityRepositoryRecord;
            const VALUES = []
            for (const copiedEntityRepositoryRecord of copiedEntityRepositoryRecords) {
                VALUES.push([
                    copiedEntityRepositoryRecord.entityRecord._actorRecordId,
                    copiedEntityRepositoryRecord.entityRecord.actor._localId,
                    copiedEntityRepositoryRecord.entityRecord.repository._localId,
                    copiedEntityRepositoryRecord.repositoryWithCopy._localId
                ])
            }
            await this.db.insertValuesGenerateIds({
                INSERT_INTO: ceqr = Q_airport____at_airport_slash_layover.CopiedEntityRepositoryRecord,
                columns: [
                    ceqr.entityRecord._actorRecordId,
                    ceqr.entityRecord.actor._localId,
                    ceqr.entityRecord.repository._localId,
                    ceqr.repositoryWithCopy._localId
                ],
                VALUES
            }, context)
        }

}
