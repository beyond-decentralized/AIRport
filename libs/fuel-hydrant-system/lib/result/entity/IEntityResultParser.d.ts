import { IAirportDatabase, ISchemaUtils, IUtils, MappedEntityArray, ReferencedColumnData } from '@airport/air-control';
import { DbEntity, QueryResultType, SQLDataType } from '@airport/ground-control';
export declare class GraphQueryConfiguration {
    strict: boolean;
    mapped: boolean;
}
export interface IEntityResultParser {
    addEntity(entityAlias: string, dbEntity: DbEntity, airDb: IAirportDatabase, schemaUtils: ISchemaUtils): any;
    addProperty(entityAlias: string, resultObject: any, dataType: SQLDataType, propertyName: string, propertyValue: any): boolean;
    bufferManyToOneStub(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, relationInfos: ReferencedColumnData[], schemaUtils: ISchemaUtils): void;
    bufferBlankManyToOneStub(entityAlias: string, resultObject: any, propertyName: string, relationInfos: ReferencedColumnData[]): void;
    bufferManyToOneObject(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, relatedEntityId: any, schemaUtils: ISchemaUtils): void;
    bufferBlankManyToOneObject(entityAlias: string, resultObject: any, propertyName: string): void;
    bufferOneToManyStub(otmDbEntity: DbEntity, otmPropertyName: string): void;
    bufferOneToManyCollection(entityAlias: string, resultObject: any, otmDbEntity: DbEntity, propertyName: string, relationDbEntity: DbEntity, childResultObject: any, schemaUtils: ISchemaUtils): void;
    bufferBlankOneToMany(entityAlias: string, resultObject: any, otmEntityName: string, propertyName: string, relationDbEntity: DbEntity, schemaUtils: ISchemaUtils): void;
    flushEntity(entityAlias: string, dbEntity: DbEntity, selectClauseFragment: any, idValue: any, resultObject: any, schemaUtils: ISchemaUtils): any;
    flushRow(): void;
    bridge(parsedResults: any[], selectClauseFragment: any, schemaUtils: ISchemaUtils): any[] | MappedEntityArray<any>;
}
export declare function getObjectResultParser(utils: IUtils, queryResultType: QueryResultType, config?: GraphQueryConfiguration, rootDbEntity?: DbEntity): IEntityResultParser;
export declare abstract class AbstractObjectResultParser {
    protected addManyToOneStub(resultObject: any, propertyName: string, relationInfos: ReferencedColumnData[], schemaUtils: ISchemaUtils): boolean;
}
