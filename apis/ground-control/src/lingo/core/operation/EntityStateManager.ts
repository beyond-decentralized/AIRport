import { DbEntity } from "../../application/Entity";

export enum EntityState {
	CREATE = 'CREATE',
	DATE = 'DATE',
	DELETE = 'DELETE',
	// TODO: PARENT_ID is currently not implemented.  It is meant for @ManyToOne()
	// references when nothing is returned except for the id fields of the relation
	PARENT_ID = 'PARENT_ID',
	// A "Pass through object" is an existing that is present in the object graph
	// but no operations are performed on it
	PASS_THROUGH = 'PASS_THROUGH',
	// An "Id's only" stub
	STUB = 'STUB',
	UPDATE = 'UPDATE',
	// Json fields promote application de-normalization and a currently not implemented
	// except for internal APIs
	// RESULT_JSON = 'RESULT_JSON',
	// RESULT_JSON_ARRAY = 'RESULT_JSON_ARRAY'
}

export interface IEntityStateAsFlags {
	isCreate: boolean
	isDelete: boolean
	isParentId: boolean
	isPassThrough: boolean
	isResultDate: boolean
	isStub: boolean
	isUpdate: boolean
}

export interface IEntityStateManager {

	isStub<T>(
		entity: T
	): boolean

	isParentId<T>(
		entity: T
	): boolean

	getOperationUniqueId<T>(
		entity: T,
		throwIfNotFound?: boolean,
		dbEntity?: DbEntity
	): number

	copyOperationUniqueId<T>(
		entity: T,
		entityCopy: T
	): void

	markAsStub<T>(
		entity: T
	): void

	markForDeletion<T>(
		entity: T
	): void

	markToCreate<T>(
		entity: T
	): void

	markToUpdate<T>(
		entity: T
	): void

	getEntityState<T>(
		entity: T
	): EntityState

	copyEntityState<T>(
		fromEntity: T,
		toEntity: T
	): void

	getUniqueIdFieldName(): string

	getStateFieldName(): string

	getEntityStateTypeAsFlags<T>(
		entity: T,
		dbEntity: DbEntity
	): IEntityStateAsFlags

	getOriginalValues<T>(
		entity: T
	): any

	setOriginalValues<T>(
		originalValues: any,
		entity: T
	): void

	setIsDeleted<T>(
		isDeleted: boolean,
		entity: T
	): void

	isDeleted<T>(
		entity: T
	): boolean

}