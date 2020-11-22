export enum EntityState {
	NEW = 0,
	STUB = 1,
	EXISTING = 2,
};

export interface EntityWithState {
	__state__: EntityState;
}

export function getEntityState(
	entity
): EntityState {
	return (<EntityWithState>entity).__state__;
}

export function isStub(
	entity
): boolean {
	return getEntityState(entity) === EntityState.STUB;
}

export function markAsStub<T>(
	entity: T
): T {
	(<EntityWithState><any>entity).__state__ = EntityState.STUB;

	return entity;
}

export const OPERATION_UNIQUE_ID_FIELD = '__UID__'
export type OperationUniqueId = number
export interface IOperationUniqueIdSequence {
	sequence: number
}
export function getOperationUniqueIdSeq(): IOperationUniqueIdSequence {
	return {
		sequence: 1
	}
}
// TODO: wire in in the client to mark all sent objects (used for de-duplication on server side).
export function uniquelyIdentify<T>(
	entity: T,
	operationUniqueIdSeq: IOperationUniqueIdSequence
): void {
	entity[OPERATION_UNIQUE_ID_FIELD] = operationUniqueIdSeq.sequence++
}
export function getOperationUniqueId<T>(
	entity: T
): void {
	return entity[OPERATION_UNIQUE_ID_FIELD]
}

export function isNew(
	entity
): boolean {
	return getEntityState(entity) === EntityState.NEW;
}

export function markAsNew<T>(
	entity: T
): T {
	(<EntityWithState><any>entity).__state__ = EntityState.NEW;

	return entity;
}

export function isExisting(
	entity
): boolean {
	return getEntityState(entity) === EntityState.EXISTING;
}

export function markAsExisting<T>(
	entity: T
): T {
	(<EntityWithState><any>entity).__state__ = EntityState.EXISTING;

	return entity;
}
