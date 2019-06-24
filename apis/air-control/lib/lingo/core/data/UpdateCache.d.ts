import { DbEntity } from '@airport/ground-control';
import { ISchemaUtils } from '../../utils/SchemaUtils';
import { UpdateCacheType } from './UpdateCacheType';
export interface IUpdateCache {
    /**
     * Start Context for an UpdateProperties Operation.  All entity update operations must be
     * performed on cached entities.
     *
     * This starts recording all queries and allows the update to diff recorded
     * query results with the updated object to get the actual changed fields.
     *
     * @param {Entity} entities
     */
    addToCache(schemaUtils: ISchemaUtils, cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    /**
     * Completely drops update cache.
     */
    /**
     * Releases UpdateProperties Cache for entities that haven't been released
     * via an update call.
     *
     * @param {Entity} entities
     */
    getOriginalRecord(dbEntity: DbEntity, idKey: string): any;
    getEntityUpdateCache(schemaUtils: ISchemaUtils, dbEntity: DbEntity, entity: any): any;
    getEntityUpdateDiff(schemaUtils: ISchemaUtils, dbEntity: DbEntity, entity: any, failOnNoOriginalRecord?: boolean): any;
}
