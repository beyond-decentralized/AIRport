import { ISaveResult } from "@airport/ground-control";
import { IEntityStateManager } from "@airport/pressurization";
export interface IUpdateCacheManager {
    saveOriginalValues<T>(serializedEntity: any, entity: T, entityStateManager: IEntityStateManager): any;
    setOperationState<E, T = E | E[]>(serializedEntity: any, entity: T, entityStateManager: IEntityStateManager): void;
    updateOriginalValuesAfterSave<E, T = E | E[]>(serializedEntity: any, entity: T, saveResult: ISaveResult, entityStateManager: IEntityStateManager): any;
}
export declare class UpdateCacheManager implements IUpdateCacheManager {
    saveOriginalValues<E, T = E | E[]>(serializedEntity: any, entity: E, entityStateManager: IEntityStateManager): any;
    setOperationState<E, T = E | E[]>(serializedEntity: any, entity: T, entityStateManager: IEntityStateManager): void;
    private doSetOperationState;
    /**
     * Resets the originalValue to the new version.
     *
     * TODO: process newly created entity IDs (if any),
     * and add them where applicable
     *
     * @param serializedEntity
     * @param entity
     * @param entityStateManager
     * @returns
     */
    updateOriginalValuesAfterSave<E, T = E | E[]>(serializedEntity: any, entity: T, saveResult: ISaveResult, entityStateManager: IEntityStateManager): any;
    private doUpdateOriginalValuesAfterSave;
    private removeDeletedEntities;
}
//# sourceMappingURL=UpdateCacheManager.d.ts.map