export interface EntityWithState {
    __state__: EntityState;
}
export declare enum EntityState {
    CREATE = "CREATE",
    DATE = "DATE",
    DELETE = "DELETE",
    PARENT_ID = "PARENT_ID",
    STUB = "STUB",
    UPDATE = "UPDATE"
}
export interface IUiStateManager {
    isStub<T>(entity: T): boolean;
    isParentId<T>(entity: T): boolean;
    markForDeletion<T>(entity: T, arrayToRemoveFrom?: T[]): void;
    isDeleted<T>(entity: T): boolean;
    markAsStub<T>(entity: T): void;
}
export declare class UiStateManager implements IUiStateManager {
    protected static STATE_FIELD: string;
    isStub<T>(entity: T): boolean;
    isParentId<T>(entity: T): boolean;
    markForDeletion<T>(entity: T, arrayToRemoveFrom?: T[]): void;
    isDeleted<T>(entity: T): boolean;
    markAsStub<T>(entity: T): void;
    private getEntityState;
}
//# sourceMappingURL=UiStateManager.d.ts.map