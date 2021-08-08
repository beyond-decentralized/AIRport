import { DI } from '@airport/di'
import {
	DbEntity,
	EntityState,
	ENTITY_STATE_MANAGER,
	IEntityStateAsFlags,
	IEntityStateManager
} from '@airport/ground-control';

export interface EntityWithState {
	__state__: EntityState;
}

export function markForDeletion<T>(
	entity: T
) {
	DI.db().getSync(ENTITY_STATE_MANAGER).markForDeletion(entity);
}

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
		(<EntityWithState><any>toEntity).__state__ = (<EntityWithState><any>fromEntity).__state__
	}

	getStateFieldName(): string {
		return EntityStateManager.STATE_FIELD
	}

	getEntityStateTypeAsFlags<T>(
		entity: T,
		dbEntity: DbEntity
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
            if(dbEntity) {
                entityDescription = dbEntity.schemaVersion.schema.name + '.' + dbEntity.name
            } else {
                entityDescription = JSON.stringify(entity)
            }
            throw new Error(`Could not find "${EntityStateManager.OPERATION_UNIQUE_ID_FIELD}" property on DTO:
        
        ${entityDescription}`)
        }
    }
    return operationUniqueId
}

markAsStub<T>(
    entity: T
): void {
    (<EntityWithState><any>entity).__state__ = EntityState.STUB
}


getUniqueIdFieldName(): string {
    return EntityStateManager.OPERATION_UNIQUE_ID_FIELD
}

}

DI.set(ENTITY_STATE_MANAGER, EntityStateManager)
