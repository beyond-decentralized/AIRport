import { DbEntity, EntityState, IEntityStateAsFlags, IEntityStateManager } from '@airport/ground-control';
export interface EntityWithState {
    __state__: EntityState;
}
export declare function markAsStub<T>(entity: T): void;
export declare function markForDeletion<T>(entity: T): void;
export declare function markToCreate<T>(entity: T): void;
export declare function markToUpdate<T>(entity: T): void;
export declare function getEntityState<T>(entity: T): void;
export declare function copyEntityState<T>(entity: T, entity2: T): void;
export declare function getEntityStateTypeAsFlags<T>(entity: T, dbEntity: DbEntity): void;
export declare function isStub<T>(entity: T): void;
export declare function isParentId<T>(entity: T, dbEntity: DbEntity): void;
export declare class EntityStateManager implements IEntityStateManager {
    static DELETED_PROPERTY: string;
    static OPERATION_UNIQUE_ID_FIELD: string;
    static ORIGINAL_VALUES_PROPERTY: string;
    static STATE_FIELD: string;
    isStub<T>(entity: T): boolean;
    isParentId<T>(entity: T): boolean;
    getOperationUniqueId<T>(entity: T, throwIfNotFound?: boolean, dbEntity?: DbEntity): number;
    markAsStub<T>(entity: T): void;
    markForDeletion<T>(entity: T): void;
    markToCreate<T>(entity: T): void;
    markToUpdate<T>(entity: T): void;
    getEntityState<T>(entity: T): EntityState;
    getOriginalValues<T>(entity: T): any;
    setOriginalValues<T>(originalValues: any, entity: T): void;
    copyEntityState<T>(fromEntity: T, toEntity: T): void;
    getUniqueIdFieldName(): string;
    getStateFieldName(): string;
    getEntityStateTypeAsFlags<T>(entity: T, dbEntity: DbEntity): IEntityStateAsFlags;
    setIsDeleted<T>(isDeleted: boolean, entity: T): void;
    isDeleted<T>(entity: T): boolean;
}
//# sourceMappingURL=EntityStateManager.d.ts.map