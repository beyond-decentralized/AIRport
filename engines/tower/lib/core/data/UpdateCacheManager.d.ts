import { IApplicationUtils, IUpdateCacheManager } from "@airport/air-traffic-control";
import { DbEntity, IEntityStateManager, ISaveResult } from "@airport/ground-control";
export declare class UpdateCacheManager implements IUpdateCacheManager {
    entityStateManager: IEntityStateManager;
    applicationUtils: IApplicationUtils;
    saveOriginalValues<E, T = E | E[]>(entity: T, dbEntity: DbEntity): any;
    setOperationState<E, T = E | E[]>(entityCopy: T, dbEntity: DbEntity, processedEntities: Set<any>): void;
    afterSaveModifications<E, T = E | E[]>(entity: T, dbEntity: DbEntity, saveResult: ISaveResult, processedEntities: Set<any>): void;
    private updateOriginalValuesAfterSave;
    private doUpdateOriginalValuesAfterSave;
    private removeDeletedEntities;
}
//# sourceMappingURL=UpdateCacheManager.d.ts.map