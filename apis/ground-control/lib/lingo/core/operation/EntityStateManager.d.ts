import { DbEntity } from "../../schema/Entity";
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
export interface IEntityStateManager {
    isStub<T>(entity: T): boolean;
    isParentId<T>(entity: T): boolean;
    getOperationUniqueId<T>(entity: T, throwIfNotFound?: boolean, dbEntity?: DbEntity): number;
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