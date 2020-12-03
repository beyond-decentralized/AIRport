import {DI}                   from '@airport/di'
import {DbEntity}             from '@airport/ground-control'
import {ENTITY_STATE_MANAGER} from '../../../tokens'

export type OperationUniqueId = number

export enum EntityState {
	CREATE    = 1,
	DELETE    = 2,
	PARENT_ID = 3,
	STUB      = 4,
	UPDATE    = 5
}

export interface EntityWithState {
	__state__: EntityState;
}

export interface IOperationUniqueIdSequence {
	sequence: OperationUniqueId
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
		dbEntity: DbEntity
	): [boolean, boolean, boolean, boolean, boolean]

}

export class EntityStateManager
	implements IEntityStateManager {
	static OPERATION_UNIQUE_ID_FIELD = '__UID__'
	static STATE_FIELD               = '__state__'

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
		dbEntity: DbEntity
	): [boolean, boolean, boolean, boolean, boolean] {
		let isCreate, isDelete, isParentId, isUpdate, isStub
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
			case EntityState.UPDATE:
				isParentId = true
				break
			case EntityState.UPDATE:
				isUpdate = true
				break
			case EntityState.STUB:
				isStub = true
				break
			default:
				throw new Error(`Unexpected entity state
"${this.getStateFieldName()}" for ${dbEntity.name}: ${entityState}`)
		}

		return [isCreate, isDelete, isParentId, isUpdate, isStub]
	}

}

DI.set(ENTITY_STATE_MANAGER, EntityStateManager)
