import {DI}                   from '@airport/di'
import {ENTITY_STATE_MANAGER} from '../../../tokens'

export type OperationUniqueId = number

export enum EntityState {
	STUB = 1,
}

export interface EntityWithState {
	__state__: EntityState;
}

export interface IOperationUniqueIdSequence {
	sequence: number
}

export interface IEntityStateManager {

	isStub<T>(
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
	): T

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
	): T {
		(<EntityWithState><any>entity).__state__ = EntityState.STUB

		return entity
	}

	protected getEntityState(
		entity
	): EntityState {
		return (<EntityWithState>entity).__state__
	}
}

DI.set(ENTITY_STATE_MANAGER, EntityStateManager)
