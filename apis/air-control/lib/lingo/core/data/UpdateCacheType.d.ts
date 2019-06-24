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
