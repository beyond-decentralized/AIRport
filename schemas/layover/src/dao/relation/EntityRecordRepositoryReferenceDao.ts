import { IContext, Injected } from "@airport/direction-indicator";
import { EntityRecordRepositoryReference } from "../../ddl/relation/EntityRecordRepositoryReference";
import { BaseEntityRecordRepositoryReferenceDao } from "../../generated/baseDaos";
import { QEntityRecordRepositoryReference } from "../../generated/qInterfaces";
import Q_airport____at_airport_slash_layover from "../../generated/qApplication";

@Injected()
export class EntityRecordRepositoryReferenceDao
    extends BaseEntityRecordRepositoryReferenceDao {

        async insert(
            EntityRecordRepositoryReferences: EntityRecordRepositoryReference[],
            context: IContext
        ): Promise<void> {
            let rrer: QEntityRecordRepositoryReference;
            const VALUES = []
            for (const EntityRecordRepositoryReference of EntityRecordRepositoryReferences) {
                VALUES.push([
                    EntityRecordRepositoryReference.entityRelationRecord.integerId,
                    EntityRecordRepositoryReference.referencingRepository._localId
                ])
            }
            await this.db.insertValuesGenerateIds({
                INSERT_INTO: rrer = Q_airport____at_airport_slash_layover.EntityRecordRepositoryReference,
                columns: [
                    rrer.entityRelationRecord.integerId,
                    rrer.referencingRepository._localId
                ],
                VALUES
            }, context)
        }

}
