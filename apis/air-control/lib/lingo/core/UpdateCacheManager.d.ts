import { DbEntity, IEntityStateManager, ISaveResult } from "@airport/ground-control";
import { ISchemaUtils } from "../utils/SchemaUtils";
export interface IUpdateCacheManager {
    saveOriginalValues<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, schemaUtils: ISchemaUtils): any;
    setOperationState<E, T = E | E[]>(entityCopy: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, schemaUtils: ISchemaUtils, processedEntities: Set<any>): void;
    afterSaveModifications<E, T = E | E[]>(entity: T, dbEntity: DbEntity, saveResult: ISaveResult, entityStateManager: IEntityStateManager, schemaUtils: ISchemaUtils, processedEntities: Set<any>): void;
}
//# sourceMappingURL=UpdateCacheManager.d.ts.map