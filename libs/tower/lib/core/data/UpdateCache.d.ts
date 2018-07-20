import { IUtils, UpdateCacheType } from "@airport/air-control";
import { DbEntity } from "@airport/ground-control";
/**
 * Created by Papa on 9/8/2016.
 */
export interface EntityUpdateCache {
    [id: string]: any;
}
export interface IUpdateCache {
    dropCache(): void;
    addToCache(cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    dropFromCache(cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    getOriginalRecord(dbEntity: DbEntity, idKey: string): any;
    getEntityUpdateCache(dbEntity: DbEntity, entity: any): any;
    getEntityUpdateDiff(dbEntity: DbEntity, entity: any, failOnNoOriginalRecord?: boolean): any;
}
export declare class UpdateCache implements IUpdateCache {
    private utils;
    private updateCache;
    private saveRun;
    constructor(utils: IUtils);
    dropCache(): void;
    addToCache(cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    dropFromCache(cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    getEntityUpdateCache(dbEntity: DbEntity, entity: any): any;
    getOriginalRecord(dbEntity: DbEntity, idKey: string): any;
    getEntityUpdateDiff(dbEntity: DbEntity, entity: any, failOnNoOriginalRecord?: boolean): any;
    private getEntityCache;
    private saveToUpdateCacheInternal;
    private getEntityCacheEntry;
    private copyColumn;
    private getUpdateCache;
}
