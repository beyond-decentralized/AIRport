import { Application_Index } from "../application/IApplication";
import { DbEntity_TableIndex, DbEntity } from "../application/DbEntity";
import { DbColumn, DbRelation } from "../application/DbProperty";
import { CRUDOperation } from "../core/operation/Operation";
import { ChangeType } from "../data/ChangeType";

export interface EntityIdData {
  idColumnValueData: {
    idColumn: DbColumn;
    idValue: number | string;
    propertyNameChains: string[][];
  }[];
  idKey: string;
  entityChangeType?: ChangeType;
}

export interface IApplicationUtils {

  getColumnPaths(
    dbColumn: DbColumn,
    breadCrumb: string[],
  ): string[][]

  getDbEntity(
    applicationIndex: Application_Index,
    entityIndex: DbEntity_TableIndex
  ): DbEntity;

  getEntityConstructor(
    dbEntity: DbEntity
  ): any;

  getNewEntity(
    dbEntity: DbEntity
  ): any;

  getOneSideEntityOfManyRelationColumn(
    dbColumn: DbColumn
  ): DbEntity

  isIdEmpty(idValue: any): boolean;

  isEmpty(value: any): boolean;

  isRelationColumn(
    dbColumn: DbColumn,
  ): boolean

  isManyRelationColumn(
    dbColumn: DbColumn
  ): boolean

  isOneRelationColumn(
    dbColumn: DbColumn
  ): boolean

  isActorLid(
    columnName: string
  ): boolean

  isActorRecordId(
    columnName: string
  ): boolean

  isRepositoryId(
    columnName: string,
  ): boolean;

  doCascade(
    dbRelation: DbRelation,
    crudOperation: CRUDOperation,
  ): boolean;

  getColumnPropertyNameChainsAndValue(
    dbEntity: DbEntity,
    dbColumn: DbColumn,
    entityObject: any,
    forIdKey?: boolean,
    generateNegativeIdsForMissing?: boolean
  ): [string[][], any];

  addRelationToEntitySelectClause(
    dbRelation: DbRelation,
    selectClause: any,
    allowDefaults?: boolean,
  ): void;

  forEachColumnOfRelation(
    dbRelation: DbRelation,
    entity: any,
    callback: {
      (
        dbColumn: DbColumn,
        value: any,
        propertyNameChains: string[][],
      ): void | boolean
    },
    failOnNoValue?: boolean,
  ): void;

  forEachColumnTypeOfRelation(
    dbRelation: DbRelation,
    callback: {
      (
        dbColumn: DbColumn,
        propertyNameChains: string[][],
      ): void | boolean
    },
  ): void;

}
