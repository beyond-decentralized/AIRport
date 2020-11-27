export declare enum EntityState {
    NEW = 0,
    STUB = 1,
    EXISTING = 2
}
export interface EntityWithState {
    __state__: EntityState;
}
export declare function getEntityState(entity: any): EntityState;
export declare function isStub(entity: any): boolean;
export declare function markAsStub<T>(entity: T): T;
export declare const OPERATION_UNIQUE_ID_FIELD = "__UID__";
export declare type OperationUniqueId = number;
export interface IOperationUniqueIdSequence {
    sequence: number;
}
export declare function getOperationUniqueIdSeq(): IOperationUniqueIdSequence;
export declare function uniquelyIdentify<T>(entity: T, operationUniqueIdSeq: IOperationUniqueIdSequence): void;
export declare function getOperationUniqueId<T>(entity: T, throwIfNotFound?: boolean): number;
//# sourceMappingURL=EntityState.d.ts.map