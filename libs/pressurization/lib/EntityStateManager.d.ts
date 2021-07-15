export declare type OperationUniqueId = number;
export declare enum EntityState {
    CREATE = 1,
    DELETE = 2,
    PARENT_ID = 3,
    RESULT = 4,
    RESULT_DATE = 5,
    RESULT_JSON = 6,
    RESULT_JSON_ARRAY = 7,
    STUB = 8,
    UPDATE = 9
}
export interface EntityWithState {
    __state__: EntityState;
}
export interface IOperationUniqueIdSequence {
    sequence: OperationUniqueId;
}
export interface IEntityStateAsFlags {
    isCreate: boolean;
    isDelete: boolean;
    isParentId: boolean;
    isResult: boolean;
    isResultDate: boolean;
    isResultJson: boolean;
    isStub: boolean;
    isUpdate: boolean;
}
export interface IDbEntity {
    name: string;
}
export interface IEntityStateManager {
    isStub<T>(entity: T): boolean;
    isParentId<T>(entity: T): boolean;
    getOperationUniqueIdSeq(): IOperationUniqueIdSequence;
    uniquelyIdentify<T>(entity: T, operationUniqueIdSeq: IOperationUniqueIdSequence): void;
    getOperationUniqueId<T>(entity: T, throwIfNotFound?: boolean): number;
    markAsStub<T>(entity: T): void;
    markForDeletion<T>(entity: T): void;
    markToCreate<T>(entity: T): void;
    markToUpdate<T>(entity: T): void;
    getEntityState<T>(entity: T): EntityState;
    copyEntityState<T>(fromEntity: T, toEntity: T): void;
    getUniqueIdFieldName(): string;
    getStateFieldName(): string;
    getEntityStateTypeAsFlags<T>(entity: T, dbEntity: IDbEntity): IEntityStateAsFlags;
}
export declare function markAsStub<T>(entity: T): void;
export declare function markForDeletion<T>(entity: T): void;
export declare function markToCreate<T>(entity: T): void;
export declare function markToUpdate<T>(entity: T): void;
export declare function getEntityState<T>(entity: T): void;
export declare function copyEntityState<T>(entity: T, entity2: T): void;
export declare function getEntityStateTypeAsFlags<T>(entity: T, dbEntity: IDbEntity): void;
export declare function isStub<T>(entity: T): void;
export declare function isParentId<T>(entity: T, dbEntity: IDbEntity): void;
export declare class EntityStateManager implements IEntityStateManager {
    static OPERATION_UNIQUE_ID_FIELD: string;
    static STATE_FIELD: string;
    isStub<T>(entity: T): boolean;
    isParentId<T>(entity: T): boolean;
    getOperationUniqueIdSeq(): IOperationUniqueIdSequence;
    uniquelyIdentify<T>(entity: T, operationUniqueIdSeq: IOperationUniqueIdSequence): void;
    getOperationUniqueId<T>(entity: T, throwIfNotFound?: boolean): number;
    markAsStub<T>(entity: T): void;
    markForDeletion<T>(entity: T): void;
    markToCreate<T>(entity: T): void;
    markToUpdate<T>(entity: T): void;
    getEntityState<T>(entity: T): EntityState;
    copyEntityState<T>(fromEntity: T, toEntity: T): void;
    getUniqueIdFieldName(): string;
    getStateFieldName(): string;
    getEntityStateTypeAsFlags<T>(entity: T, dbEntity: IDbEntity): IEntityStateAsFlags;
}
//# sourceMappingURL=EntityStateManager.d.ts.map