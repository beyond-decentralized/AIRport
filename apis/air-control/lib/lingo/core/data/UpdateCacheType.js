export var UpdateCacheType;
(function (UpdateCacheType) {
    /**
     * Do not put retrieved entities into the update cache.
     */
    UpdateCacheType[UpdateCacheType["NONE"] = 0] = "NONE";
    /**
     * Only put the entities from the root of the SELECT clause
     * into the update cache.
     */
    UpdateCacheType[UpdateCacheType["ROOT_QUERY_ENTITIES"] = 1] = "ROOT_QUERY_ENTITIES";
    /**
     * Put all entities in SELECT clause into the update cache.
     */
    UpdateCacheType[UpdateCacheType["ALL_QUERY_ENTITIES"] = 2] = "ALL_QUERY_ENTITIES";
})(UpdateCacheType || (UpdateCacheType = {}));
//# sourceMappingURL=UpdateCacheType.js.map