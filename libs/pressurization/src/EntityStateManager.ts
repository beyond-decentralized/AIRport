import { DI } from '@airport/di'
import { ENTITY_STATE_MANAGER } from './tokens'

export type OperationUniqueId = number

export enum EntityState {
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
	sequence: OperationUniqueId
}

export interface IEntityStateAsFlags {
	isCreate: boolean
	isDelete: boolean
	isParentId: boolean
	isResult: boolean
	isResultDate: boolean
	isResultJson: boolean
	isStub: boolean
	isUpdate: boolean
}

export interface IDbEntity {
	name: string
}

export interface IEntityStateManager {

	isStub<T>(
		entity: T
	): boolean

	isParentId<T>(
		entity: T
	): boolean

	getOperationUniqueIdSeq(): IOperationUniqueIdSequence

	uniquelyIdentify<T>(
		entity: T,
		operationUniqueIdSeq: IOperationUniqueIdSequence
	): void

	getOperationUniqueId<T>(
		entity: T,
		throwIfNotFound?: boolean
	): number

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
		dbEntity: IDbEntity
	): IEntityStateAsFlags

}

export function markAsStub<T>(
	entity: T
) {
	DI.db().getSync(ENTITY_STATE_MANAGER).markAsStub(entity);
}

export function markForDeletion<T>(
	entity: T
) {
	DI.db().getSync(ENTITY_STATE_MANAGER).markForDeletion(entity);
}

export function markToCreate<T>(
	entity: T
) {
	DI.db().getSync(ENTITY_STATE_MANAGER).markToCreate(entity);
}

export function markToUpdate<T>(
	entity: T
) {
	DI.db().getSync(ENTITY_STATE_MANAGER).markToUpdate(entity);
}

export function getEntityState<T>(
	entity: T
) {
	DI.db().getSync(ENTITY_STATE_MANAGER).getEntityState(entity);
}

export function copyEntityState<T>(
	entity: T,
	entity2: T
) {
	DI.db().getSync(ENTITY_STATE_MANAGER).copyEntityState(entity, entity2);
}

export function getEntityStateTypeAsFlags<T>(
	entity: T,
	dbEntity: IDbEntity
) {
	DI.db().getSync(ENTITY_STATE_MANAGER).getEntityStateTypeAsFlags(entity, dbEntity);
}

export function isStub<T>(
	entity: T
) {
	DI.db().getSync(ENTITY_STATE_MANAGER).isStub(entity);
}

export function isParentId<T>(
	entity: T,
	dbEntity: IDbEntity
) {
	DI.db().getSync(ENTITY_STATE_MANAGER).isParentId(entity);
}

export class EntityStateManager
	implements IEntityStateManager {
	static OPERATION_UNIQUE_ID_FIELD = '__UID__'
	static STATE_FIELD = '__state__'

	isStub<T>(
		entity: T
	): boolean {
		return this.getEntityState(entity) === EntityState.STUB
	}

	isParentId<T>(
		entity: T
	): boolean {
		return this.getEntityState(entity) === EntityState.PARENT_ID
	}

	getOperationUniqueIdSeq(): IOperationUniqueIdSequence {
		return {
			sequence: 1
		}
	}

	uniquelyIdentify<T>(
		entity: T,
		operationUniqueIdSeq: IOperationUniqueIdSequence
	): void {
		// TODO: wire in in the client to mark all sent objects (used for de-duplication on server side).
		entity[EntityStateManager.OPERATION_UNIQUE_ID_FIELD] = operationUniqueIdSeq.sequence++
	}

	getOperationUniqueId<T>(
		entity: T,
		throwIfNotFound = true
	): number {
		const operationUniqueId = entity[EntityStateManager.OPERATION_UNIQUE_ID_FIELD]

		if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
			if (throwIfNotFound) {
				throw new Error(`Could not find "${EntityStateManager.OPERATION_UNIQUE_ID_FIELD}" property on DTO:
			
			${JSON.stringify(entity)}`)
			}
		}
		return operationUniqueId
	}

	markAsStub<T>(
		entity: T
	): void {
		(<EntityWithState><any>entity).__state__ = EntityState.STUB
	}

	markForDeletion<T>(
		entity: T
	): void {
		(<EntityWithState><any>entity).__state__ = EntityState.DELETE
	}

	markToCreate<T>(
		entity: T
	): void {
		(<EntityWithState><any>entity).__state__ = EntityState.CREATE
	}

	markToUpdate<T>(
		entity: T
	): void {
		(<EntityWithState><any>entity).__state__ = EntityState.UPDATE
	}

	getEntityState<T>(
		entity: T
	): EntityState {
		return (<EntityWithState><any>entity).__state__
	}

	copyEntityState<T>(
		fromEntity: T,
		toEntity: T
	): void {
		(<EntityWithState><any>toEntity).__state__ = (<EntityWithState><any>fromEntity).__state__
	}

	getUniqueIdFieldName(): string {
		return EntityStateManager.OPERATION_UNIQUE_ID_FIELD
	}

	getStateFieldName(): string {
		return EntityStateManager.STATE_FIELD
	}

	getEntityStateTypeAsFlags<T>(
		entity: T,
		dbEntity: IDbEntity
	): IEntityStateAsFlags {
		let isCreate, isDelete, isParentId, isResult, isResultDate, isResultJson, isStub, isUpdate
		const entityState = this.getEntityState(entity)
		switch (entityState) {
			case EntityState.CREATE:
				isCreate = true
				break
			case EntityState.DELETE:
				isDelete = true
				break
			case EntityState.PARENT_ID:
				isUpdate = true
				break
			case EntityState.RESULT:
				isResult = true
				break
			case EntityState.RESULT_DATE:
				isResultDate = true
				break
			case EntityState.RESULT_JSON:
				isResultJson = true
				break
			case EntityState.STUB:
				isStub = true
				break
			case EntityState.UPDATE:
				isParentId = true
				break
			default:
				throw new Error(`Unexpected entity state
"${this.getStateFieldName()}" for ${dbEntity.name}: ${entityState}`)
		}

		return {
			isCreate,
			isDelete,
			isParentId,
			isResult,
			isResultDate,
			isResultJson,
			isStub,
			isUpdate,
		}
	}

}

DI.set(ENTITY_STATE_MANAGER, EntityStateManager)
