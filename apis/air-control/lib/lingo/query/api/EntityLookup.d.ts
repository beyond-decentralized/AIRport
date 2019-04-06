/**
 * Type of update-caching to apply to retrieved entities.
 */
import { QueryResultType } from "@airport/ground-control";
export declare enum UpdateCacheType {
    /**
     * Do not put retrieved entities into the update cache.
     */
    NONE = 0,
    /**
     * Only put the entities from the root of the SELECT clause
     * into the update cache.
     */
    ROOT_QUERY_ENTITIES = 1,
    /**
     * Put all entities in SELECT clause into the update cache.
     */
    ALL_QUERY_ENTITIES = 2
}
/**
 * Common upstream for all entity retrieval operations.
 */
export interface IEntityLookup<Child, MappedChild> {
    /**
     * Enables update caching (required for all update operations).
     * Entities that are retrieved are cached for update purposes.
     * On entity update operations, framework looks into this cache
     * to diff the object provided to the update operation with the
     * object originally retrieved.
     *
     * @param {UpdateCacheType} cacheForUpdateState
     * @returns {Child}
     */
    andCacheForUpdate(cacheForUpdateState: UpdateCacheType): Child;
    mapped: MappedChild;
    getQueryResultType(baseQueryResultType: QueryResultType): QueryResultType;
}
