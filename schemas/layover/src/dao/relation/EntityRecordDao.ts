import { IContext, Injected } from "@airport/direction-indicator";
import { BaseEntityRecordDao } from "../../generated/baseDaos";
import { Q_airport____at_airport_slash_layover } from '../../generated/qApplication'
import { QEntityRecord } from '../../generated/qInterfaces'
import { EntityRecord } from "../../ddl/relation/EntityRecord";

@Injected()
export class EntityRecordDao
    extends BaseEntityRecordDao {

        async insert(
            copiedEntityRecords: EntityRecord[],
            context: IContext
        ): Promise<void> {
            let cer: QEntityRecord;
            const VALUES = []
            for (const copiedEntityRecord of copiedEntityRecords) {
                VALUES.push([
                    copiedEntityRecord._actorRecordId,
                    copiedEntityRecord.actor._localId,
                    copiedEntityRecord.repository._localId,
                    copiedEntityRecord.ddlEntity._localId
                ])
            }
            await this.db.insertValuesGenerateIds({
                INSERT_INTO: cer = Q_airport____at_airport_slash_layover.CopiedEntityRecord,
                columns: [
                    cer._actorRecordId,
                    cer.actor._localId,
                    cer.repository._localId,
                    cer.ddlEntity._localId
                ],
                VALUES
            }, context)
        }

}
