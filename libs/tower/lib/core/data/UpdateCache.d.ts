import { ISchemaUtils, IUpdateCache, UpdateCacheType } from '@airport/air-control';
import { DbEntity } from '@airport/ground-control';
/**
 * Created by Papa on 9/8/2016.
 */
export interface EntityUpdateCache {
    [id: string]: any;
}
export declare class UpdateCache implements IUpdateCache {
    /**
     * Start Context for an UpdateProperties Operation.  All entity update operations must
     * be performed on cached entities.
     *
     * This starts recording all queries and allows the update to diff recorded
     * query results with the updated object to get the actual changed fields.
     *
     * @param {Entity} entities
     */
    addToCache(schemaUtils: ISchemaUtils, cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    dropFromCache(schemaUtils: ISchemaUtils, cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    getEntityUpdateCache(schemaUtils: ISchemaUtils, dbEntity: DbEntity, entity: any): any;
    getOriginalRecord(dbEntity: DbEntity, idKey: string): any;
    getEntityUpdateDiff(schemaUtils: ISchemaUtils, dbEntity: DbEntity, entity: any, failOnNoOriginalRecord?: boolean): any;
    private getEntityCache;
    private saveToUpdateCacheInternal;
    private getEntityCacheEntry;
    private copyColumn;
}
