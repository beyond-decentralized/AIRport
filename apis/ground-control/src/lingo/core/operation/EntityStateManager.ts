import { DbEntity } from "../../schema/Entity";

export enum EntityState {
	CREATE = 'CREATE',
	DATE = 'DATE',
	DELETE = 'DELETE',
	PARENT_ID = 'PARENT_ID',
	// Not sure if RESULT is still needed, with removal of RESULT_JSON and RESULT_JSON_ARRAY
	// RESULT = 'RESULT',
	STUB = 'STUB',
	UPDATE = 'UPDATE',
	// Json fields promote schema de-normalization
	// RESULT_JSON = 'RESULT_JSON',
	// RESULT_JSON_ARRAY = 'RESULT_JSON_ARRAY'
}

export interface IEntityStateAsFlags {
	isCreate: boolean
	isDelete: boolean
	isParentId: boolean
	// isResult: boolean
	isResultDate: boolean
	// isResultJson: boolean
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