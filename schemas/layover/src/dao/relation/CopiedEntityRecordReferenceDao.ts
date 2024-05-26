import { IContext, Injected } from "@airport/direction-indicator";
import { CopiedEntityRecordReference } from "../../ddl/relation/CopiedEntityRecordReference";
import { BaseCopiedEntityRecordReferenceDao } from "../../generated/baseDaos";
import { QCopiedEntityRecordReference } from "../../generated/qInterfaces";
import Q_airport____at_airport_slash_layover from "../../generated/qApplication";

@Injected()
export class CopiedEntityRecordReferenceDao
    extends BaseCopiedEntityRecordReferenceDao {

        async insert(
            copiedEntityRecordReferences: CopiedEntityRecordReference[],
            context: IContext
        ): Promise<void> {
            let rrer: QCopiedEntityRecordReference;
            const VALUES = []
            for (const copiedEntityRecordReference of copiedEntityRecordReferences) {
                VALUES.push([
                    copiedEntityRecordReference.copiedEntityRelationRecord.integerId,
                    copiedEntityRecordReference.referencingEntityRecord.integerId
                ])
            }
            await this.db.insertValuesGenerateIds({
                INSERT_INTO: rrer = Q_airport____at_airport_slash_layover.CopiedEntityRecordReference,
                columns: [
                    rrer.copiedEntityRelationRecord.integerId,
                    rrer.referencingEntityRecord.integerId
                ],
                VALUES
            }, context)
        }

}
