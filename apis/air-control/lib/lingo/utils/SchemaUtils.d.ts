import { ChangeType, CRUDOperation, DbColumn, DbEntity, DbRelation, SchemaIndex, SQLDataType, TableIndex } from '@airport/ground-control';
import { QEntityConstructor } from '../../impl/core/entity/Entity';
import { IAirportDatabase } from '../AirportDatabase';
import { IEntityIdProperties, IQEntity } from '../core/entity/Entity';
import { IQFieldInternal } from '../core/field/Field';
export interface ManyToOneColumnMapping {
    tableIndex: number;
    propertyChain: string[];
    value: any;
}
export interface ReferencedColumnData {
    propertyNameChains: string[][];
    sqlDataType: SQLDataType;
    value?: any;
}
export interface EntityIdData {
    idColumnValueData: {
        idColumn: DbColumn;
        idValue: number | string;
        propertyNameChains: string[][];
    }[];
    idKey: string;
    entityChangeType?: ChangeType;
}
export interface IdKeysByIdColumnIndex {
    arrayByIdColumnIndex: (number | string)[];
    mapByIdColumnName: {
        [columnName: string]: (number | string);
    };
}
export interface RepositorySheetSelectInfo {
    actorIdColumnIndex: number;
    actorRecordIdColumnIndex: number;
    draftColumnIndex: number;
    draftColumnUpdated: boolean;
    repositoryIdColumnIndex: number;
    systemWideOperationIdColumn: DbColumn;
    selectClause?: IQFieldInternal<any>[];
    selectClauseColumns?: DbColumn[];
}
export interface ISchemaUtils {
    getDbEntity(schemaIndex: SchemaIndex, tableIndex: TableIndex, airDb: IAirportDatabase): DbEntity;
    getQEntityConstructor(dbEntity: DbEntity, airDb: IAirportDatabase): QEntityConstructor<any>;
    getEntityConstructor(dbEntity: DbEntity, airDb: IAirportDatabase): any;
    getNewEntity(dbEntity: DbEntity, airDb: IAirportDatabase): any;
    isIdEmpty(idValue: any): boolean;
    isEmpty(value: any): boolean;
    isRelationColumn(dbColumn: DbColumn): boolean;
    isActorId(columnName: string): boolean;
    isRepositoryId(columnName: string): boolean;
    doCascade(dbRelation: DbRelation, crudOperation: CRUDOperation): boolean;
    getIdKey(entityObject: IEntityIdProperties, dbEntity: DbEntity, failOnNoId?: boolean, idValueCallback?: {
        (idColumn: DbColumn, value: number | string, propertyNameChains: string[][]): void;
    }): string;
    getIdKeyInfo(entityObject: IEntityIdProperties, dbEntity: DbEntity, failOnNoId?: boolean, idValueCallback?: {
        (idColumn: DbColumn, value: number | string, propertyNameChains: string[][]): void;
    }): IdKeysByIdColumnIndex;
    getColumnPropertyNameChainsAndValue(dbEntity: DbEntity, dbColumn: DbColumn, entityObject: any, forIdKey?: boolean): [string[][], any];
    addRelationToEntitySelectClause(dbRelation: DbRelation, selectClause: any, allowDefaults?: boolean): void;
    forEachColumnOfRelation(dbRelation: DbRelation, entity: any, callback: {
        (dbColumn: DbColumn, value: any, propertyNameChains: string[][]): void | boolean;
    }, failOnNoValue?: boolean): void;
    forEachColumnTypeOfRelation(dbRelation: DbRelation, callback: {
        (dbColumn: DbColumn, propertyNameChains: string[][]): void | boolean;
    }): void;
    getSheetSelectFromSetClause(dbEntity: DbEntity, qEntity: IQEntity<any>, setClause: any, errorPrefix: string): RepositorySheetSelectInfo;
}
//# sourceMappingURL=SchemaUtils.d.ts.map