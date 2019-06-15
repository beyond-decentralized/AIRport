import { CRUDOperation, DbColumn, DbEntity, DbRelation, SchemaIndex, TableIndex } from '@airport/ground-control';
import { IAirportDatabase } from '../../lingo/AirportDatabase';
import { IEntityIdProperties, IQEntity } from '../../lingo/core/entity/Entity';
import { IdKeysByIdColumnIndex, ISchemaUtils } from '../../lingo/utils/SchemaUtils';
import { QEntityConstructor } from '../core/entity/Entity';
export declare class SchemaUtils implements ISchemaUtils {
    static TEMP_ID: number;
    getDbEntity(schemaIndex: SchemaIndex, tableIndex: TableIndex, airDb: IAirportDatabase): DbEntity;
    isRepositoryId(columnName: string): boolean;
    doCascade(dbRelation: DbRelation, crudOperation: CRUDOperation): boolean;
    getQEntityConstructor(dbEntity: DbEntity, airDb: IAirportDatabase): QEntityConstructor;
    getEntityConstructor(dbEntity: DbEntity, airDb: IAirportDatabase): any;
    getNewEntity(dbEntity: DbEntity, airDb: IAirportDatabase): any;
    isIdEmpty(idValue: any): boolean;
    isEmpty(value: any): boolean;
    isRelationColumn(dbColumn: DbColumn): boolean;
    isManyRelationColumn(dbColumn: DbColumn): boolean;
    isOneRelationColumn(dbColumn: DbColumn): boolean;
    getIdKey(entityObject: IEntityIdProperties, dbEntity: DbEntity, failOnNoId?: boolean, idValueCallback?: {
        (relationColumn: DbColumn, value: any, propertyNameChains: string[][]): void;
    }): string;
    getIdKeyInfo(entityObject: IEntityIdProperties, dbEntity: DbEntity, failOnNoId?: boolean, idValueCallback?: {
        (relationColumn: DbColumn, value: any, propertyNameChains: string[][]): void;
    }): IdKeysByIdColumnIndex;
    getColumnPropertyNameChainsAndValue(dbEntity: DbEntity, dbColumn: DbColumn, entityObject: any, forIdKey?: boolean): [string[][], any];
    private getColumnValuesAndPaths;
    private getColumnPaths;
    addRelationToEntitySelectClause(dbRelation: DbRelation, selectClause: any, allowDefaults?: boolean): void;
    forEachColumnOfRelation(dbRelation: DbRelation, entity: any, callback: {
        (dbColumn: DbColumn, value: any, propertyNameChains: string[][]): void | boolean;
    }, failOnNoValue?: boolean): void;
    forEachColumnTypeOfRelation(dbRelation: DbRelation, callback: {
        (dbColumn: DbColumn, propertyNameChains: string[][]): void | boolean;
    }): void;
    getSheetSelectFromSetClause(dbEntity: DbEntity, qEntity: IQEntity, setClause: any): any[];
    getTableName(dbEntity: DbEntity): string;
    private addColumnToSheetSelect;
    private handleNoId;
}
