import { Injected } from "@airport/direction-indicator";

export interface EntityWithState {
	__state__: EntityState;
}

export enum EntityState {
	CREATE = 'CREATE',
	DATE = 'DATE',
	DELETE = 'DELETE',
	PARENT_SCHEMA_ID = 'PARENT_SCHEMA_ID',
	STUB = 'STUB',
	UPDATE = 'UPDATE',
}

export interface IUiStateManager {

	isStub<T>(
		entity: T
	): boolean

	isParentSchemaId<T>(
		entity: T
	): boolean

	markForDeletion<T>(
		entity: T,
		arrayToRemoveFrom?: T[]
	): void

	isDeleted<T>(
		entity: T
	): boolean

	markAsStub<T>(
		entity: T
	): void

}

@Injected()
export class UiStateManager
	implements IUiStateManager {
	protected static STATE_FIELD = '__state__'

	isStub<T>(
		entity: T
	): boolean {
		return this.getEntityState(entity) === EntityState.STUB
	}

	isParentSchemaId<T>(
		entity: T
	): boolean {
		return this.getEntityState(entity) === EntityState.PARENT_SCHEMA_ID
	}

	markForDeletion<T>(
		entity: T,
		arrayToRemoveFrom?: T[]
	): void {
		(<EntityWithState><any>entity)[UiStateManager.STATE_FIELD] = EntityState.DELETE
		if (!arrayToRemoveFrom) {
			return
		}
		for (let i = arrayToRemoveFrom.length - 1; i >= 0; i--) {
			if (arrayToRemoveFrom[i] === entity) {
				arrayToRemoveFrom.splice(i, 1)
				break
			}
		}
	}

	isDeleted<T>(
		entity: T
	): boolean {
		return entity[UiStateManager.STATE_FIELD] === EntityState.DELETE
	}


	markAsStub<T>(
		entity: T
	): void {
		(<EntityWithState><any>entity)[UiStateManager.STATE_FIELD] = EntityState.STUB
	}

	private getEntityState<T>(
		entity: T
	): EntityState {
		return (<EntityWithState><any>entity)[UiStateManager.STATE_FIELD]
	}

}
