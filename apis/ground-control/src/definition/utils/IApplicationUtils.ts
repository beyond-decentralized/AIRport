import { Application_Index } from "../application/IApplication";
import { DbEntity_TableIndex, DbEntity } from "../application/DbEntity";
import { DbColumn, DbProperty, DbRelation } from "../application/DbProperty";
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

  addRelationToEntitySelectClause(
    dbRelation: DbRelation,
    selectClause: any,
    allowDefaults?: boolean,
  ): void

  doCascade(
    dbRelation: DbRelation,
    crudOperation: CRUDOperation,
  ): boolean

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
  ): void

  forEachColumnTypeOfRelation(
    dbRelation: DbRelation,
    callback: {
      (
        dbColumn: DbColumn,
        propertyNameChains: string[][],
      ): void | boolean
    },
  ): void

  getColumnPaths(
    dbColumn: DbColumn,
    breadCrumb: string[],
  ): string[][]

  getColumnPropertyNameChainsAndValue(
    dbEntity: DbEntity,
    dbColumn: DbColumn,
    entityObject: any,
    forIdKey?: boolean,
    generateNegativeIdsForMissing?: boolean
  ): [string[][], any]

  getDbEntity(
    applicationIndex: Application_Index,
    entityIndex: DbEntity_TableIndex
  ): DbEntity

  getEntityConstructor(
    dbEntity: DbEntity
  ): any

  getNewEntity(
    dbEntity: DbEntity
  ): any

  getOneSideEntityOfManyRelationColumn(
    dbColumn: DbColumn
  ): DbEntity

  isActorLid(
    columnName: string
  ): boolean

  isActorRecordId(
    columnName: string
  ): boolean

  isIdEmpty(idValue: any): boolean

  isEmpty(value: any): boolean

  isManyRelationColumn(
    dbColumn: DbColumn
  ): boolean

  isOneRelationColumn(
    dbColumn: DbColumn
  ): boolean

  isOneToMayRelation(
    dbRelation: DbRelation
  ): boolean

  isRelationColumn(
    dbColumn: DbColumn,
  ): boolean

  isRepositoryId(
    columnName: string,
  ): boolean

  isPropertyRequiredForCreateOperation(
    dbProperty: DbProperty
  ): boolean

  isSystemWideOperationId(
    columnName: string
  ): boolean

}
