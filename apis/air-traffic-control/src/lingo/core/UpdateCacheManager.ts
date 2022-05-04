import {
    DbEntity,
    ISaveResult
} from "@airport/ground-control";

export interface IUpdateCacheManager {

    saveOriginalValues<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity
    ): any

    setOperationState<E, T = E | E[]>(
        entityCopy: T,
        dbEntity: DbEntity,
        processedEntities: Set<any>
    ): void

    afterSaveModifications<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        saveResult: ISaveResult,
        processedEntities: Set<any>
    ): void

}