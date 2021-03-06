import { DbEntity, EntityState, IEntityStateAsFlags, IEntityStateManager } from '@airport/ground-control';
export interface EntityWithState {
    __state__: EntityState;
    __originalValues__: any;
}
export declare class EntityStateManager implements IEntityStateManager {
    static DELETED_PROPERTY: string;
    static ORIGINAL_VALUES_PROPERTY: string;
    static STATE_FIELD: string;
    static OPERATION_UNIQUE_ID_FIELD: string;
    isStub<T>(entity: T): boolean;
    isParentSchemaId<T>(entity: T): boolean;
    isPassThrough<T>(entity: T): boolean;
    markAsOfParentSchema<T>(entity: T): void;
    markForDeletion<T>(entity: T): void;
    markToCreate<T>(entity: T): void;
    markToUpdate<T>(entity: T): void;
    getEntityState<T>(entity: T): EntityState;
    getOriginalValues<T>(entity: T): any;
    setOriginalValues<T>(originalValues: any, entity: T): void;
    copyEntityState<T>(fromEntity: T, toEntity: T): void;
    getStateFieldName(): string;
    getEntityStateTypeAsFlags<T>(entity: T, dbEntity: DbEntity): IEntityStateAsFlags;
    setIsDeleted<T>(isDeleted: boolean, entity: T): void;
    isDeleted<T>(entity: T): boolean;
    getOperationUniqueId<T>(entity: T, throwIfNotFound?: boolean, dbEntity?: DbEntity): number;
    copyOperationUniqueId<T>(entity: T, entityCopy: T): void;
    markAsStub<T>(entity: T): void;
    getUniqueIdFieldName(): string;
}
export declare function injectEntityStateManager(): void;
//# sourceMappingURL=EntityStateManager.d.ts.map