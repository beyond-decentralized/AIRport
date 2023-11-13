import { Injected } from "@airport/direction-indicator"
import { DbRelation } from "@airport/ground-control"
import { CopiedRecordLedger } from "../ddl/repository/relation/CopiedRecordLedger"


export interface ICrossRepositoryRelationManager {

    addCopiedRecordLedger(
        manySideRelation: DbRelation,
        manySideEntity,
        copiedEntity
    ): CopiedRecordLedger

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

}