import { ReferencedColumnData } from '@airport/air-control';
import { DbEntity } from '@airport/ground-control';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { TreeResultParser } from '../TreeResultParser';
import { IEntityResultParser } from './IEntityResultParser';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * The goal of this Parser is to determine which objects in the current row are the same
 * as they were in the previous row.  If the objects are the same this parser will merge
 * them.
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
    addEntity(entityAlias: string, dbEntity: DbEntity, context: IFuelHydrantContext): any;
    bufferManyToOneStub(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, relationInfos: ReferencedColumnData[], context: IFuelHydrantContext): void;
    bufferBlankManyToOneStub(entityAlias: string, resultObject: any, propertyName: string): void;
    bufferManyToOneObject(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, childResultObject: any, context: IFuelHydrantContext): void;
    bufferBlankManyToOneObject(entityAlias: string, resultObject: any, propertyName: string): void;
    bufferOneToManyStub(otmDbEntity: DbEntity, otmPropertyName: string): void;
    bufferOneToManyCollection(entityAlias: string, resultObject: any, otmDbEntity: DbEntity, propertyName: string, relationDbEntity: DbEntity, childResultObject: any, context: IFuelHydrantContext): void;
    bufferBlankOneToMany(entityAlias: string, resultObject: any, otmEntityName: string, propertyName: string, relationDbEntity: DbEntity, context: IFuelHydrantContext): void;
    flushEntity(entityAlias: string, dbEntity: DbEntity, selectClauseFragment: any, entityId: any, resultObject: any, context: IFuelHydrantContext): any;
    bridge(parsedResults: any[], selectClauseFragment: any, context: IFuelHydrantContext): any[];
    private addManyToOneReference;
}
//# sourceMappingURL=EntityTreeResultParser.d.ts.map