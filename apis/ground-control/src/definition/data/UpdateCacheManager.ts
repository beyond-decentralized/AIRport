import { DbEntity } from "../application/Entity"
import { ISaveResult } from "../query/SaveResult"

export interface IUpdateCacheManager {

    saveOriginalValues<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity
    ): any

    setOperationState<E, T = E | E[]>(
        entityCopy: T,
        dbEntity: DbEntity,
        processedEntities: Set<any>,
        checkGeneratedIds: boolean
    ): void

    afterSaveModifications<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        saveResult: ISaveResult,
        processedEntities: Set<any>
    ): void

}