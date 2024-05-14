import { IContext, Injected } from "@airport/direction-indicator";
import { BaseEntityQueryRecordDao } from "../../generated/baseDaos";
import { Q_airport____at_airport_slash_layover } from '../../generated/qApplication'
import { QEntityQueryRecord } from '../../generated/qInterfaces'
import { EntityQueryRecord } from "../../ddl/relation/EntityQueryRecord";

@Injected()
export class CopiedEntityQueryRecordDao
    extends BaseEntityQueryRecordDao {


    async insert(
        copiedEntityQueryRecords: EntityQueryRecord[],
        context: IContext
    ): Promise<void> {
        let ceqr: QEntityQueryRecord;
        const VALUES = []
        for (const copiedEntityQueryRecord of copiedEntityQueryRecords) {
            VALUES.push([
                copiedEntityQueryRecord.entityRecord._actorRecordId,
                copiedEntityQueryRecord.entityRecord.actor._localId,
                copiedEntityQueryRecord.entityRecord.repository._localId,
                copiedEntityQueryRecord.queryNumber
            ])
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: ceqr = Q_airport____at_airport_slash_layover.CopiedEntityQueryRecord,
            columns: [
                ceqr.entityRecord._actorRecordId,
                ceqr.entityRecord.actor._localId,
                ceqr.entityRecord.repository._localId,
                ceqr.queryNumber
            ],
            VALUES
        }, context)
    }

}
