import {
  ChangeType,
  CRUDOperation,
  DbColumn,
  DbEntity,
  DbRelation,
  Application_Index,
  SQLDataType,
  ApplicationEntity_TableIndex,
} from '@airport/ground-control';
import type { QEntityConstructor } from '../../impl/core/entity/Entity';
import {
  IEntityIdProperties,
  IQEntity,
} from '../core/entity/Entity';
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
  arrayByIdColumnIndex: (number | string)[],
  mapByIdColumnName: { [columnName: string]: (number | string) }
}

export interface RepositorySheetSelectInfo {
  actorIdColumnIndex: number;
  actorRecordIdColumnIndex: number;
  repositoryIdColumnIndex: number;
  systemWideOperationIdColumn: DbColumn;
  selectClause?: IQFieldInternal<any>[];
  selectClauseColumns?: DbColumn[];
}

export interface IApplicationUtils {

  getDbEntity(
    applicationIndex: Application_Index,
    tableIndex: ApplicationEntity_TableIndex
  ): DbEntity;

  getQEntityConstructor(
    dbEntity: DbEntity
  ): QEntityConstructor;

  getEntityConstructor(
    dbEntity: DbEntity
  ): any;

  getNewEntity(
    dbEntity: DbEntity
  ): any;

  isIdEmpty(idValue: any): boolean;

  isEmpty(value: any): boolean;

  isRelationColumn(
    dbColumn: DbColumn,
  ): boolean;

  isActorId(
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

  getIdKey(
    entityObject: IEntityIdProperties,
    dbEntity: DbEntity,
    failOnNoId?: boolean,
    // noIdValueCallback?: {
    // 	(
    // 		idColumn: DbColumn,
    // 		value: number | string,
    // 		propertyNameChains: string[][],
    // 	): boolean;
    // },
    idValueCallback?: {
      (
        idColumn: DbColumn,
        value: number | string,
        propertyNameChains: string[][],
      ): void;
    },
  ): string;

  getIdKeyInfo(
    entityObject: IEntityIdProperties,
    dbEntity: DbEntity,
    failOnNoId?: boolean,
    idValueCallback?: {
      (
        idColumn: DbColumn,
        value: number | string,
        propertyNameChains: string[][],
      ): void;
    },
  ): IdKeysByIdColumnIndex;

  getColumnPropertyNameChainsAndValue(
    dbEntity: DbEntity,
    dbColumn: DbColumn,
    entityObject: any,
    forIdKey?: boolean,
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

  getSheetSelectFromSetClause(
    dbEntity: DbEntity,
    qEntity: IQEntity,
    setClause: any,
    errorPrefix: string,
  ): RepositorySheetSelectInfo;

}
