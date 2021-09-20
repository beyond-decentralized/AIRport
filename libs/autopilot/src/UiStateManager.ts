import { DI } from '@airport/di'
import { UI_STATE_MANAGER } from './tokens';

export interface EntityWithState {
	__state__: EntityState;
}


export enum EntityState {
	CREATE = 'CREATE',
	DATE = 'DATE',
	DELETE = 'DELETE',
	PARENT_ID = 'PARENT_ID',
	STUB = 'STUB',
	UPDATE = 'UPDATE',
}

export function markForDeletion<T>(
	entity: T
) {
	DI.db().getSync(UI_STATE_MANAGER).markForDeletion(entity);
}

export function isDeleted<T>(
	entity: T
): boolean {
	return DI.db().getSync(UI_STATE_MANAGER).isDeleted(entity);
}

export interface IUiStateManager {

	isStub<T>(
		entity: T
	): boolean

	isParentId<T>(
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

export class UiStateManager
	implements IUiStateManager {
	protected static STATE_FIELD = '__state__'

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

DI.set(UI_STATE_MANAGER, UiStateManager)
