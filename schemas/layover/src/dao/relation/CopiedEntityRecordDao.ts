import { IContext, Injected } from "@airport/direction-indicator";
import { BaseCopiedEntityRecordDao } from "../../generated/baseDaos";
import { Q_airport____at_airport_slash_layover } from '../../generated/qApplication'
import { QCopiedEntityRecord } from '../../generated/qInterfaces'
import { CopiedEntityRecord } from "../../ddl/relation/CopiedEntityRecord";

@Injected()
export class CopiedEntityRecordDao
    extends BaseCopiedEntityRecordDao {

        async insert(
            copiedEntityRecords: CopiedEntityRecord[],
            context: IContext
        ): Promise<void> {
            let cer: QCopiedEntityRecord;
            const VALUES = []
            for (const copiedEntityRecord of copiedEntityRecords) {
                VALUES.push([
                    copiedEntityRecord._actorRecordId,
                    copiedEntityRecord.actor._localId,
                    copiedEntityRecord.repository._localId,
                    copiedEntityRecord.copyDdlEntity._localId
                ])
            }
            await this.db.insertValuesGenerateIds({
                INSERT_INTO: cer = Q_airport____at_airport_slash_layover.CopiedEntityRecord,
                columns: [
                    cer._actorRecordId,
                    cer.actor._localId,
                    cer.repository._localId,
                    cer.copyDdlEntity._localId
                ],
                VALUES
            }, context)
        }

}
