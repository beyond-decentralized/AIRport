export declare type OperationUniqueId = number;
export declare enum EntityState {
    STUB = 1
}
export interface EntityWithState {
    __state__: EntityState;
}
export interface IOperationUniqueIdSequence {
    sequence: number;
}
export interface IEntityStateManager {
    isStub<T>(entity: T): boolean;
    getOperationUniqueIdSeq(): IOperationUniqueIdSequence;
    uniquelyIdentify<T>(entity: T, operationUniqueIdSeq: IOperationUniqueIdSequence): void;
    getOperationUniqueId<T>(entity: T, throwIfNotFound?: boolean): number;
    markAsStub<T>(entity: T): T;
}
export declare class EntityStateManager implements IEntityStateManager {
    static OPERATION_UNIQUE_ID_FIELD: string;
    static STATE_FIELD: string;
    isStub<T>(entity: T): boolean;
    getOperationUniqueIdSeq(): IOperationUniqueIdSequence;
    uniquelyIdentify<T>(entity: T, operationUniqueIdSeq: IOperationUniqueIdSequence): void;
    getOperationUniqueId<T>(entity: T, throwIfNotFound?: boolean): number;
    markAsStub<T>(entity: T): T;
    protected getEntityState(entity: any): EntityState;
}
//# sourceMappingURL=EntityStateManager.d.ts.map