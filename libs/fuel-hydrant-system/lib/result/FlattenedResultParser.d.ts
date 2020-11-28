import { ReferencedColumnData } from '@airport/air-control';
import { DbEntity, SQLDataType } from '@airport/ground-control';
import { IOperationContext } from '@airport/tower';
import { AbstractObjectResultParser, IEntityResultParser } from './entity/IEntityResultParser';
/**
 * Created by Papa on 10/16/2016.
 */
export declare class FlattenedResultParser extends AbstractObjectResultParser implements IEntityResultParser {
    currentResultRow: any[];
    addEntity(entityAlias: string, dbEntity: DbEntity, context: IOperationContext<any, any>): any;
    addProperty(entityAlias: string, resultObject: any, dataType: SQLDataType, propertyName: string, propertyValue: any): boolean;
    bufferManyToOneStub(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, relationInfos: ReferencedColumnData[], context: IOperationContext<any, any>): void;
    bufferBlankManyToOneStub(entityAlias: string, resultObject: any, propertyName: string, relationInfos: ReferencedColumnData[]): void;
    bufferManyToOneObject(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, childResultObject: any, context: IOperationContext<any, any>): any;
    bufferBlankManyToOneObject(entityAlias: string, resultObject: any, propertyName: string): void;
    bufferOneToManyStub(otmDbEntity: DbEntity, otmPropertyName: string): void;
    bufferOneToManyCollection(entityAlias: string, resultObject: any, otmDbEntity: DbEntity, propertyName: string, relationDbEntity: DbEntity, childResultObject: any, context: IOperationContext<any, any>): void;
    bufferBlankOneToMany(entityAlias: string, resultObject: any, otmEntityName: string, propertyName: string, relationDbEntity: DbEntity, context: IOperationContext<any, any>): void;
    flushEntity(entityAlias: string, dbEntity: DbEntity, selectClauseFragment: any, entityId: any, resultObject: any, context: IOperationContext<any, any>): any;
    flushRow(): void;
    bridge(parsedResults: any[], selectClauseFragment: any, context: IOperationContext<any, any>): any[];
}
//# sourceMappingURL=FlattenedResultParser.d.ts.map