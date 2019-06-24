/**
 * Type of update-caching to apply to retrieved entities.
 */
import { UpdateCacheType } from '../../core/data/UpdateCacheType';
import { ILookup } from './Lookup';
/**
 * Common parent for all entity retrieval operations.
 */
export interface IEntityLookup<Child, MappedChild> extends ILookup {
    map(): MappedChild;
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
    cache(cacheForUpdateState?: UpdateCacheType): Child;
    noCache(): Child;
}
