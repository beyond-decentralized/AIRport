import { IApplicationUtils, MappedEntityArray, ReferencedColumnData } from '@airport/air-traffic-control';
import { DbEntity, IEntityStateManager, SQLDataType } from '@airport/ground-control';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
/**
 * Created by Papa on 10/16/2016.
 */
export declare class GraphQueryConfiguration {
    strict: boolean;
    mapped: boolean;
}
export interface IEntityResultParser {
    addEntity(entityAlias: string, dbEntity: DbEntity, context: IFuelHydrantContext): any;
    addProperty(entityAlias: string, resultObject: any, dataType: SQLDataType, propertyName: string, propertyValue: any): boolean;
    bufferManyToOneStub(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, relationInfos: ReferencedColumnData[], context: IFuelHydrantContext): void;
    bufferBlankManyToOneStub(entityAlias: string, resultObject: any, propertyName: string, relationInfos: ReferencedColumnData[]): void;
    bufferManyToOneObject(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, relatedEntityId: any, context: IFuelHydrantContext): void;
    bufferBlankManyToOneObject(entityAlias: string, resultObject: any, propertyName: string): void;
    bufferOneToManyStub(otmDbEntity: DbEntity, otmPropertyName: string): void;
    bufferOneToManyCollection(entityAlias: string, resultObject: any, otmDbEntity: DbEntity, propertyName: string, relationDbEntity: DbEntity, childResultObject: any, context: IFuelHydrantContext): void;
    bufferBlankOneToMany(entityAlias: string, resultObject: any, otmEntityName: string, propertyName: string, relationDbEntity: DbEntity, context: IFuelHydrantContext): void;
    flushEntity(entityAlias: string, dbEntity: DbEntity, selectClauseFragment: any, idValue: any, resultObject: any, context: IFuelHydrantContext): any;
    flushRow(): void;
    bridge(parsedResults: any[], selectClauseFragment: any, context: IFuelHydrantContext): any[] | MappedEntityArray<any>;
}
export declare abstract class AbstractObjectResultParser {
    protected applicationUtils: IApplicationUtils;
    protected entityStateManager: IEntityStateManager;
    constructor(applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager);
    protected addManyToOneStub(resultObject: any, propertyName: string, relationInfos: ReferencedColumnData[], context: IFuelHydrantContext): boolean;
}
//# sourceMappingURL=IEntityResultParser.d.ts.map