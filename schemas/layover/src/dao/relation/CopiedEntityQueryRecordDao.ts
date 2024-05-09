import { IContext, Injected } from "@airport/direction-indicator";
import { BaseCopiedEntityQueryRecordDao } from "../../generated/baseDaos";
import { Q_airport____at_airport_slash_layover } from '../../generated/qApplication'
import { QCopiedEntityQueryRecord } from '../../generated/qInterfaces'
import { CopiedEntityQueryRecord } from "../../ddl/relation/CopiedEntityQueryRecord";

@Injected()
export class CopiedEntityQueryRecordDao
    extends BaseCopiedEntityQueryRecordDao {


    async insert(
        copiedEntityQueryRecords: CopiedEntityQueryRecord[],
        context: IContext
    ): Promise<void> {
        let ceqr: QCopiedEntityQueryRecord;
        const VALUES = []
        for (const copiedEntityQueryRecord of copiedEntityQueryRecords) {
            VALUES.push([
                copiedEntityQueryRecord.copiedEntityRecord._actorRecordId,
                copiedEntityQueryRecord.copiedEntityRecord.actor._localId,
                copiedEntityQueryRecord.copiedEntityRecord.repository._localId,
                copiedEntityQueryRecord.queryNumber
            ])
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: ceqr = Q_airport____at_airport_slash_layover.CopiedEntityQueryRecord,
            columns: [
                ceqr.copiedEntityRecord._actorRecordId,
                ceqr.copiedEntityRecord.actor._localId,
                ceqr.copiedEntityRecord.repository._localId,
                ceqr.queryNumber
            ],
            VALUES
        }, context)
    }

}
