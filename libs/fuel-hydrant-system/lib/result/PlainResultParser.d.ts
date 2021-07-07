import { ReferencedColumnData } from '@airport/air-control';
import { DbEntity, SQLDataType } from '@airport/ground-control';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { AbstractObjectResultParser, IEntityResultParser } from './entity/IEntityResultParser';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * The goal of this parser is to split a flat row of result set cells into an facade
 * graph (just for that row).
 */
export declare class PlainResultParser extends AbstractObjectResultParser implements IEntityResultParser {
    addEntity(entityAlias: string, dbEntity: DbEntity, context: IFuelHydrantContext): any;
    addProperty(entityAlias: string, resultObject: any, dataType: SQLDataType, propertyName: string, propertyValue: any): boolean;
    bufferManyToOneStub(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, relationInfos: ReferencedColumnData[], context: IFuelHydrantContext): void;
    bufferManyToOneObject(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, childResultObject: any, context: IFuelHydrantContext): any;
    bufferBlankManyToOneStub(entityAlias: string, resultObject: any, propertyName: string, relationInfos: ReferencedColumnData[]): void;
    bufferBlankManyToOneObject(entityAlias: string, resultObject: any, propertyName: string): void;
    bufferOneToManyStub(otmDbEntity: DbEntity, otmPropertyName: string): void;
    bufferOneToManyCollection(entityAlias: string, resultObject: any, otmDbEntity: DbEntity, propertyName: string, relationDbEntity: DbEntity, childResultObject: any, context: IFuelHydrantContext): void;
    bufferBlankOneToMany(entityAlias: string, resultObject: any, otmEntityName: string, propertyName: string, relationDbEntity: DbEntity, context: IFuelHydrantContext): void;
    flushEntity(entityAlias: string, dbEntity: DbEntity, selectClauseFragment: any, entityId: any, resultObject: any, context: IFuelHydrantContext): any;
    flushRow(): void;
    bridge(parsedResults: any[], selectClauseFragment: any, context: IFuelHydrantContext): any[];
}
//# sourceMappingURL=PlainResultParser.d.ts.map