import { Injected } from '@airport/air-control';
import {
	DbEntity,
	EntityState,
	IEntityStateAsFlags,
	IEntityStateManager
} from '@airport/ground-control';

export interface EntityWithState {
	__state__: EntityState;
	__originalValues__: any
}

@Injected()
export class EntityStateManager
	implements IEntityStateManager {
	static DELETED_PROPERTY = '__deleted__'
	static ORIGINAL_VALUES_PROPERTY = '__originalValues__'
	static STATE_FIELD = '__state__'
	static OPERATION_UNIQUE_ID_FIELD = '__OUID__'

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

	markForDeletion<T>(
		entity: T
	): void {
		(<EntityWithState><any>entity)[EntityStateManager.STATE_FIELD] = EntityState.DELETE
	}

	markToCreate<T>(
		entity: T
	): void {
		(<EntityWithState><any>entity)[EntityStateManager.STATE_FIELD] = EntityState.CREATE
	}

	markToUpdate<T>(
		entity: T
	): void {
		(<EntityWithState><any>entity)[EntityStateManager.STATE_FIELD] = EntityState.UPDATE
	}

	getEntityState<T>(
		entity: T
	): EntityState {
		return (<EntityWithState><any>entity)[EntityStateManager.STATE_FIELD]
	}

	getOriginalValues<T>(
		entity: T
	): any {
		return entity[EntityStateManager.ORIGINAL_VALUES_PROPERTY]
	}

	setOriginalValues<T>(
		originalValues: any,
		entity: T
	): void {
		entity[EntityStateManager.ORIGINAL_VALUES_PROPERTY] = originalValues
	}

	copyEntityState<T>(
		fromEntity: T,
		toEntity: T
	): void {
		(<EntityWithState><any>toEntity)[EntityStateManager.STATE_FIELD]
			= (<EntityWithState><any>fromEntity)[EntityStateManager.STATE_FIELD];
		(<EntityWithState><any>toEntity)[EntityStateManager.ORIGINAL_VALUES_PROPERTY]
			= (<EntityWithState><any>fromEntity)[EntityStateManager.ORIGINAL_VALUES_PROPERTY]

	}

	getStateFieldName(): string {
		return EntityStateManager.STATE_FIELD
	}

	getEntityStateTypeAsFlags<T>(
		entity: T,
		dbEntity: DbEntity
	): IEntityStateAsFlags {
		let isCreate, isDelete, isParentId, isPassThrough, isResult,
			isResultDate, isResultJson, isStub, isUpdate
		const entityState = this.getEntityState(entity)
		switch (entityState) {
			case EntityState.CREATE:
				isCreate = true
				break
			case EntityState.DELETE:
				isDelete = true
				break
			case EntityState.PARENT_ID:
				isParentId = true
				break
			case EntityState.PASS_THROUGH:
				isPassThrough = true
				break
			// case EntityState.RESULT:
			// 	isResult = true
			// 	break
			case EntityState.DATE:
				isResultDate = true
				break
			// case EntityState.RESULT_JSON:
			// 	isResultJson = true
			// 	break
			case EntityState.STUB:
				isStub = true
				break
			case EntityState.UPDATE:
				isUpdate = true
				break
			default:
				throw new Error(`Unexpected entity state
"${this.getStateFieldName()}" for ${dbEntity.name}: ${entityState}`)
		}

		return {
			isCreate,
			isDelete,
			isParentId,
			isPassThrough,
			// isResult,
			isResultDate,
			isStub,
			isUpdate,
		}
	}

	setIsDeleted<T>(
		isDeleted: boolean,
		entity: T
	): void {
		entity[EntityStateManager.STATE_FIELD] = EntityState.DELETE
	}

	isDeleted<T>(
		entity: T
	): boolean {
		return entity[EntityStateManager.STATE_FIELD] === EntityState.DELETE
	}

	getOperationUniqueId<T>(
		entity: T,
		throwIfNotFound = true,
		dbEntity: DbEntity = null
	): number {
		const operationUniqueId = entity[EntityStateManager.OPERATION_UNIQUE_ID_FIELD]

		if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
			if (throwIfNotFound) {
				let entityDescription
				if (dbEntity) {
					entityDescription = dbEntity.applicationVersion.application.name + '.' + dbEntity.name
				} else {
					entityDescription = JSON.stringify(entity)
				}
				throw new Error(`Could not find "${EntityStateManager.OPERATION_UNIQUE_ID_FIELD}" property on DTO:
        
        ${entityDescription}`)
			}
		}
		return operationUniqueId
	}

	copyOperationUniqueId<T>(
		entity: T,
		entityCopy: T
	): void {
		const operationUniqueId = entity[EntityStateManager.OPERATION_UNIQUE_ID_FIELD]
		entityCopy[EntityStateManager.OPERATION_UNIQUE_ID_FIELD] = operationUniqueId
	}

	markAsStub<T>(
		entity: T
	): void {
		(<EntityWithState><any>entity)[EntityStateManager.STATE_FIELD] = EntityState.STUB
	}


	getUniqueIdFieldName(): string {
		return EntityStateManager.OPERATION_UNIQUE_ID_FIELD
	}

}

export function injectEntityStateManager() {
	console.log('inject EntityStateManager')
}