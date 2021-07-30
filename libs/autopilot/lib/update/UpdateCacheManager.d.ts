import { IEntityStateManager } from "@airport/pressurization";
export interface IUpdateCacheManager {
    saveOriginalValues<T>(entity: T, entityStateManager: IEntityStateManager): void;
    setOperationState<E, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): void;
}
export declare class UpdateCacheManager implements IUpdateCacheManager {
    saveOriginalValues<E, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): void;
    private doDeserialize;
    setOperationState<E, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): void;
    private doSetOperationState;
}
//# sourceMappingURL=UpdateCacheManager.d.ts.map