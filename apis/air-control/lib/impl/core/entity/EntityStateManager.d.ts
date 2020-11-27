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
}
export declare class EntityStateManager implements IEntityStateManager {
    static OPERATION_UNIQUE_ID_FIELD: string;
    static STATE_FIELD: string;
    isStub(entity: any): boolean;
    getOperationUniqueIdSeq(): IOperationUniqueIdSequence;
    uniquelyIdentify<T>(entity: T, operationUniqueIdSeq: IOperationUniqueIdSequence): void;
    getOperationUniqueId<T>(entity: T, throwIfNotFound?: boolean): number;
    protected getEntityState(entity: any): EntityState;
    protected markAsStub<T>(entity: T): T;
}
//# sourceMappingURL=EntityStateManager.d.ts.map