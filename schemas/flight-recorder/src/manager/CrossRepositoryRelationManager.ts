import { Injected } from "@airport/direction-indicator"
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
            manySideRelation,
            manySideEntity,
            oneSideRelation,
            copiedEntity
        );
        oneSideRepositoryLedger.repository = copiedEntity.repository

        const manySideRepositoryLedger = this.getLedger(
            manySideRelation,
            manySideEntity,
            oneSideRelation,
            copiedEntity
        );
        manySideRepositoryLedger.repository = manySideEntity.repository

        return {
            manySideRepositoryLedger,
            oneSideRepositoryLedger
        }
    }

    private getLedger(
        manySideRelation: DbRelation,
        manySideEntity,
        oneSideRelation: DbRelation,
        oneSideEntity,
    ): CrossRepositoryRelationLedger {
        const crossRepositoryRelationLedger = new CrossRepositoryRelationLedger()
        crossRepositoryRelationLedger.oneSideRelation = oneSideRelation as any
        crossRepositoryRelationLedger.oneSideActorRecordId = oneSideEntity._actorRecordId
        crossRepositoryRelationLedger.oneSideActor = oneSideEntity.actor
        crossRepositoryRelationLedger.oneSideRepository = oneSideEntity.repository
        crossRepositoryRelationLedger.manySideRelation = manySideRelation as any
        crossRepositoryRelationLedger.manySideActorRecordId = manySideEntity._actorRecordId
        crossRepositoryRelationLedger.manySideActor = manySideEntity.actor
        crossRepositoryRelationLedger.manySideRepository = manySideEntity.repository

        return crossRepositoryRelationLedger
    }
}