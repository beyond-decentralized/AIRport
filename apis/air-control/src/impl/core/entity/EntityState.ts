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