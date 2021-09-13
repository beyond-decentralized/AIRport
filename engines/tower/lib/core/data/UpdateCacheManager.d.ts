import { ISchemaUtils, IUpdateCacheManager } from "@airport/air-control";
import { DbEntity, IEntityStateManager, ISaveResult } from "@airport/ground-control";
export declare class UpdateCacheManager implements IUpdateCacheManager {
    saveOriginalValues<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager): any;
    setOperationState<E, T = E | E[]>(entityCopy: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, schemaUtils: ISchemaUtils, processedEntities: Set<any>): void;
    afterSaveModifications<E, T = E | E[]>(entity: T, dbEntity: DbEntity, saveResult: ISaveResult, entityStateManager: IEntityStateManager, processedEntities: Set<any>): void;
    private updateOriginalValuesAfterSave;
    private removeDeletedEntities;
}
//# sourceMappingURL=UpdateCacheManager.d.ts.map