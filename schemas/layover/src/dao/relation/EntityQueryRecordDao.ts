import { IContext, Injected } from "@airport/direction-indicator";
import { BaseEntityQueryRecordDao } from "../../generated/baseDaos";
import { Q_airport____at_airport_slash_layover } from '../../generated/qApplication'
import { QEntityQueryRecord } from '../../generated/qInterfaces'
import { EntityQueryRecord } from "../../ddl/relation/EntityQueryRecord";

@Injected()
export class CopiedEntityQueryRecordDao
    extends BaseEntityQueryRecordDao {


    async insert(
        entityQueryRecords: EntityQueryRecord[],
        context: IContext
    ): Promise<void> {
        let ceqr: QEntityQueryRecord;
        const VALUES = []
        for (const entityQueryRecord of entityQueryRecords) {
            VALUES.push([
                entityQueryRecord.entityRecord.integerId,
                entityQueryRecord.queryNumber
            ])
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: ceqr = Q_airport____at_airport_slash_layover.EntityQueryRecord,
            columns: [
                ceqr.entityRecord.integerId,
                ceqr.queryNumber
            ],
            VALUES
        }, context)
    }

}
