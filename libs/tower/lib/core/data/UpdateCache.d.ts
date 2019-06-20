import { ISchemaUtils, UpdateCacheType } from '@airport/air-control';
import { DbEntity } from '@airport/ground-control';
/**
 * Created by Papa on 9/8/2016.
 */
export interface EntityUpdateCache {
    [id: string]: any;
}
export interface IUpdateCache {
    dropCache(): void;
    addToCache(schemaUtils: ISchemaUtils, cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    dropFromCache(schemaUtils: ISchemaUtils, cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    getOriginalRecord(dbEntity: DbEntity, idKey: string): any;
    getEntityUpdateCache(schemaUtils: ISchemaUtils, dbEntity: DbEntity, entity: any): any;
    getEntityUpdateDiff(schemaUtils: ISchemaUtils, dbEntity: DbEntity, entity: any, failOnNoOriginalRecord?: boolean): any;
}
export declare class UpdateCache implements IUpdateCache {
    private updateCache;
    private saveRun;
    dropCache(): void;
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
