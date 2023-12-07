import { DbEntity } from "../../application/DbEntity";

export enum EntityState {
	CREATE = 'CREATE',
	DATE = 'DATE',
	DELETE = 'DELETE',
	// Originally it was PARENT_SCHEMA_ID and was meant for @ManyToOne() references
	// when nothing is returned except for the id fields of the relation, however
	// this schenario was sufficiently covered by STUB - id's only stub.  Now it's
	// FROM_ANOTHER_APP and currently used only for save operations
	// when the entity referenced via the relation belongs to another application.
	// This is because save does not allow to peristance of records across application
	// boundaries (that should be done via an @Api() which will run validation and
	// other logic).
	// In that case we want to keep the ID of the record from another application
	// so that it can be saved in the record of the current application that is
	// referencing it.
	FROM_ANOTHER_APP = 'PARENT_SCHEMA_LID',
	// A "Pass through object" is an existing object that is present in the object graph
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
	isACopy: boolean
	isCreate: boolean
	isDelete: boolean
	isFromAnotherApp: boolean
	isPassThrough: boolean
	isResultDate: boolean
	isStub: boolean
	isUpdate: boolean
}

export interface IEntityStateManager {

	copyEntityState<T>(
		fromEntity: T,
		toEntity: T
	): void

	copyOperationUniqueId<T>(
		entity: T,
		entityCopy: T
	): void

	getEntityState<T>(
		entity: T
	): EntityState

	getEntityStateTypeAsFlags<T>(
		entity: T,
		dbEntity: DbEntity
	): IEntityStateAsFlags

	getOperationUniqueId<T>(
		entity: T,
		throwIfNotFound?: boolean,
		dbEntity?: DbEntity
	): number

	getOriginalValues<T>(
		entity: T
	): any

	setOriginalValues<T>(
		originalValues: any,
		entity: T
	): void

	getStateFieldName(): string

	getUniqueIdFieldName(): string

	isACopy<T>(
		entity: T
	): boolean

	isDeleted<T>(
		entity: T
	): boolean

	isFromAnotherApp<T>(
		entity: T
	): boolean

	isPassThrough<T>(
		entity: T
	): boolean

	isStub<T>(
		entity: T
	): boolean

	markAsOfParentSchema<T>(
		entity: T
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

	setIsDeleted<T>(
		isDeleted: boolean,
		entity: T
	): void

}