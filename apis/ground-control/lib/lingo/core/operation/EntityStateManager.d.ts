import { DbEntity } from "../../schema/Entity";
export declare enum EntityState {
    CREATE = "CREATE",
    DATE = "DATE",
    DELETE = "DELETE",
    PARENT_ID = "PARENT_ID",
    STUB = "STUB",
    UPDATE = "UPDATE"
}
export interface IEntityStateAsFlags {
    isCreate: boolean;
    isDelete: boolean;
    isParentId: boolean;
    isResultDate: boolean;
    isStub: boolean;
    isUpdate: boolean;
}
export interface IEntityStateManager {
    isStub<T>(entity: T): boolean;
    isParentId<T>(entity: T): boolean;
    getOperationUniqueId<T>(entity: T, throwIfNotFound?: boolean, dbEntity?: DbEntity): number;
    copyOperationUniqueId<T>(entity: T, entityCopy: T): void;
    markAsStub<T>(entity: T): void;
    markForDeletion<T>(entity: T): void;
    markToCreate<T>(entity: T): void;
    markToUpdate<T>(entity: T): void;
    getEntityState<T>(entity: T): EntityState;
    copyEntityState<T>(fromEntity: T, toEntity: T): void;
    getUniqueIdFieldName(): string;
    getStateFieldName(): string;
    getEntityStateTypeAsFlags<T>(entity: T, dbEntity: DbEntity): IEntityStateAsFlags;
    getOriginalValues<T>(entity: T): any;
    setOriginalValues<T>(originalValues: any, entity: T): void;
    setIsDeleted<T>(isDeleted: boolean, entity: T): void;
    isDeleted<T>(entity: T): boolean;
}
//# sourceMappingURL=EntityStateManager.d.ts.map