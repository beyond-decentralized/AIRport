import { IApplicationUtils, IUpdateCacheManager } from "@airport/air-control";
import { DbEntity, IEntityStateManager, ISaveResult } from "@airport/ground-control";
export declare class UpdateCacheManager implements IUpdateCacheManager {
    saveOriginalValues<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, applicationUtils: IApplicationUtils): any;
    setOperationState<E, T = E | E[]>(entityCopy: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, applicationUtils: IApplicationUtils, processedEntities: Set<any>): void;
    afterSaveModifications<E, T = E | E[]>(entity: T, dbEntity: DbEntity, saveResult: ISaveResult, entityStateManager: IEntityStateManager, applicationUtils: IApplicationUtils, processedEntities: Set<any>): void;
    private updateOriginalValuesAfterSave;
    private doUpdateOriginalValuesAfterSave;
    private removeDeletedEntities;
}
//# sourceMappingURL=UpdateCacheManager.d.ts.map