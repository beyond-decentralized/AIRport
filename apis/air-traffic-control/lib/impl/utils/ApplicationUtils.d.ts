import { CRUDOperation, DbColumn, DbEntity, DbRelation, ApplicationIndex, TableIndex, IEntityStateManager } from '@airport/ground-control';
import { IAirportDatabase } from '../../lingo/AirportDatabase';
import { IEntityIdProperties, IQEntity } from '../../lingo/core/entity/Entity';
import { IdKeysByIdColumnIndex, IApplicationUtils, RepositorySheetSelectInfo } from '../../lingo/utils/ApplicationUtils';
import { QEntityConstructor } from '../core/entity/Entity';
import { IUtils } from '../../lingo/Utils';
export declare class ApplicationUtils implements IApplicationUtils {
    static TEMP_ID: number;
    airportDatabase: IAirportDatabase;
    entityStateManager: IEntityStateManager;
    utils: IUtils;
    getDbEntity(applicationIndex: ApplicationIndex, tableIndex: TableIndex): DbEntity;
    isActorId(columnName: string): boolean;
    isActorRecordId(columnName: string): boolean;
    isRepositoryId(columnName: string): boolean;
    doCascade(dbRelation: DbRelation, crudOperation: CRUDOperation): boolean;
    getQEntityConstructor(dbEntity: DbEntity): QEntityConstructor;
    getEntityConstructor(dbEntity: DbEntity): any;
    getNewEntity(dbEntity: DbEntity): any;
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
    getColumnPropertyNameChainsAndValue(dbEntity: DbEntity, dbColumn: DbColumn, entityObject: any, forIdKey?: boolean, generateNegativeIdsForMissing?: boolean): [string[][], any];
    addRelationToEntitySelectClause(dbRelation: DbRelation, selectClause: any, allowDefaults?: boolean): void;
    forEachColumnOfRelation(dbRelation: DbRelation, entity: any, callback: {
        (dbColumn: DbColumn, value: any, propertyNameChains: string[][]): void | boolean;
    }, failOnNoValue?: boolean): void;
    forEachColumnTypeOfRelation(dbRelation: DbRelation, callback: {
        (dbColumn: DbColumn, propertyNameChains: string[][]): void | boolean;
    }): void;
    getSheetSelectFromSetClause(dbEntity: DbEntity, qEntity: IQEntity, setClause: any, errorPrefix: string): RepositorySheetSelectInfo;
    private getColumnValuesAndPaths;
    private getColumnPaths;
    private addColumnToSheetSelect;
    private handleNoId;
}
//# sourceMappingURL=ApplicationUtils.d.ts.map