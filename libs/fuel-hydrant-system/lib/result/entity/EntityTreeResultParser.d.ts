import { ReferencedColumnData } from '@airport/air-control';
import { DbEntity } from '@airport/ground-control';
import { TreeResultParser } from '../TreeResultParser';
import { IEntityResultParser } from './IEntityResultParser';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * The goal of this Parser is to determine which objects in the current row are the same
 * as they were in the previous row.  If the objects are the same this parser will merge them.
 */
export declare class EntityTreeResultParser extends TreeResultParser implements IEntityResultParser {
    currentRowObjectMap: {
        [alias: string]: any;
    };
    objectEqualityMap: {
        [alias: string]: boolean;
    };
    lastRowObjectMap: {
        [alias: string]: any;
    };
    currentObjectOneToManys: {
        [propertyName: string]: any[];
    };
    addEntity(entityAlias: string, dbEntity: DbEntity): any;
    bufferManyToOneStub(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, relationInfos: ReferencedColumnData[]): void;
    private addManyToOneReference;
    bufferBlankManyToOneStub(entityAlias: string, resultObject: any, propertyName: string): void;
    bufferManyToOneObject(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, childResultObject: any): void;
    bufferBlankManyToOneObject(entityAlias: string, resultObject: any, propertyName: string): void;
    bufferOneToManyStub(otmDbEntity: DbEntity, otmPropertyName: string): void;
    bufferOneToManyCollection(entityAlias: string, resultObject: any, otmDbEntity: DbEntity, propertyName: string, relationDbEntity: DbEntity, childResultObject: any): void;
    bufferBlankOneToMany(entityAlias: string, resultObject: any, otmEntityName: string, propertyName: string, relationDbEntity: DbEntity): void;
    flushEntity(entityAlias: string, dbEntity: DbEntity, selectClauseFragment: any, entityId: any, resultObject: any): any;
    bridge(parsedResults: any[], selectClauseFragment: any): any[];
}
