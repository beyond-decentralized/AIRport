import { DbEntity, IDbUpdateCacheManager, IEntityStateManager, ISaveResult } from "@airport/ground-control";
export declare class DbUpdateCacheManager implements IDbUpdateCacheManager {
    saveOriginalValues<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager): any;
    setOperationState<E, T = E | E[]>(entityCopy: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, processedEntities: Set<any>): void;
    afterSaveModifications<E, T = E | E[]>(entity: T, dbEntity: DbEntity, saveResult: ISaveResult, entityStateManager: IEntityStateManager, processedEntities: Set<any>): void;
    private updateOriginalValuesAfterSave;
    private removeDeletedEntities;
}
//# sourceMappingURL=DbUpdateCacheManager.d.ts.map