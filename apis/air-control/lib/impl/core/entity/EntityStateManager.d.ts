import { DbEntity } from '@airport/ground-control';
export declare type OperationUniqueId = number;
export declare enum EntityState {
    CREATE = 1,
    DELETE = 2,
    PARENT_ID = 3,
    STUB = 4,
    UPDATE = 5
}
export interface EntityWithState {
    __state__: EntityState;
}
export interface IOperationUniqueIdSequence {
    sequence: OperationUniqueId;
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
    getEntityStateTypeAsFlags<T>(entity: T, dbEntity: DbEntity): [boolean, boolean, boolean, boolean, boolean];
}
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
    getEntityStateTypeAsFlags<T>(entity: T, dbEntity: DbEntity): [boolean, boolean, boolean, boolean, boolean];
}
//# sourceMappingURL=EntityStateManager.d.ts.map