export enum UpdateCacheType {
	/**
	 * Do not put retrieved entities into the update cache.
	 */
	NONE,
	/**
	 * Only put the entities from the root of the SELECT clause
	 * into the update cache.
	 */
	ROOT_QUERY_ENTITIES,
	/**
	 * Put all entities in SELECT clause into the update cache.
	 */
	ALL_QUERY_ENTITIES,
}
