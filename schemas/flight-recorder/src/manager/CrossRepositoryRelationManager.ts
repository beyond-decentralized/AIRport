import { Injected } from "@airport/direction-indicator"
import { AirEntity } from "@airport/final-approach"
import { DbRelation } from "@airport/ground-control"
import { CopiedRecordLedger } from "../ddl/CopiedRecordLedger"
import { CrossRepositoryRelationLedger } from "../ddl/CrossRepositoryRelationLedger"

export interface IAddedLedgerRecords {
    manySideRepositoryLedger: CrossRepositoryRelationLedger
    oneSideRepositoryLedger: CrossRepositoryRelationLedger
}

export interface ICrossRepositoryRelationManager {

    addCopiedRecordLedger(
        manySideRelation: DbRelation,
        manySideEntity,
        copiedEntity
    ): CopiedRecordLedger

    addRecords(
        manySideRelation: DbRelation,
        manySideEntity,
        copiedEntity
    ): IAddedLedgerRecords

}

@Injected()
export class CrossRepositoryRelationManager
    implements ICrossRepositoryRelationManager {

    addCopiedRecordLedger(
        manySideRelation: DbRelation,
        manySideEntity,
        copiedEntity
    ): CopiedRecordLedger {
        const copiedRecordLedger = new CopiedRecordLedger()
        copiedRecordLedger.repository = manySideEntity.repository
        copiedRecordLedger.copyAppEntity = manySideRelation.relationEntity as any
        copiedRecordLedger.copyActorRecordId = copiedEntity._actorRecordId
        copiedRecordLedger.copyActor = copiedEntity.actor
        copiedRecordLedger.copyRepository = copiedEntity.repository

        return copiedRecordLedger
    }

    addRecords(
        manySideRelation: DbRelation,
        manySideEntity,
        copiedEntity
    ): IAddedLedgerRecords {
        let oneSideRelation: DbRelation
        let oneSideDbEntity = manySideRelation.relationEntity
        for (const oneSideEntityDbRelation of oneSideDbEntity.relations) {
            if (oneSideEntityDbRelation.oneToManyElems.mappedBy === manySideRelation.property.name) {
                oneSideRelation = oneSideEntityDbRelation
                break
            }
        }

        const oneSideRepositoryLedger = this.getLedger(
            oneSideRelation,
            manySideEntity
        );
        oneSideRepositoryLedger.repository = copiedEntity.repository

        const manySideRepositoryLedger = this.getLedger(
            manySideRelation,
            copiedEntity
        );
        manySideRepositoryLedger.repository = manySideEntity.repository

        return {
            manySideRepositoryLedger,
            oneSideRepositoryLedger
        }
    }

    private getLedger<E extends AirEntity>(
        relation: DbRelation,
        relatedEntity: E
    ): CrossRepositoryRelationLedger {
        const crossRepositoryRelationLedger = new CrossRepositoryRelationLedger()
        crossRepositoryRelationLedger.relation = relation as any
        crossRepositoryRelationLedger.relatedRepository = relatedEntity.repository

        return crossRepositoryRelationLedger
    }
}