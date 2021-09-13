import {
    DbEntity,
    IEntityStateManager,
    ISaveResult
} from "@airport/ground-control";
import { ISchemaUtils } from "../utils/SchemaUtils";

export interface IUpdateCacheManager {

    saveOriginalValues<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
    ): any

    setOperationState<E, T = E | E[]>(
        entityCopy: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
        schemaUtils: ISchemaUtils,
        processedEntities: Set<any>
    ): void

    afterSaveModifications<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        saveResult: ISaveResult,
        entityStateManager: IEntityStateManager,
        processedEntities: Set<any>
    ): void

}