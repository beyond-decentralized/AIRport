export interface IUpdateCacheManager {
    saveOriginalValues<T>(entity: T): void;
}
export declare class UpdateCacheManager implements IUpdateCacheManager {
    saveOriginalValues<E, T = E | E[]>(entity: T): void;
}
//# sourceMappingURL=UpdateCacheManager.d.ts.map