import {
  QApp
} from '@airport/aviation-communication';
import {
  DbApplication,
  DbApplicationVersion,
  DbEntity,
  ISaveResult,
} from '@airport/ground-control';
import {
  INonEntityFind,
  INonEntityFindOne,
  INonEntitySearch,
  INonEntitySearchOne,
  OperationName
} from '@airport/tarmaq-dao';
import { IEntityContext } from '@airport/tarmaq-entity';
import {
  EntityConstructor,
  IFunctionsAndOperators,
  IEntityUpdateColumns,
  IEntityUpdateProperties,
  IQEntity,
  QEntityConstructor,
  QRelation,
  RawDelete,
  RawInsertColumnValues,
  RawInsertValues,
  RawUpdate,
  RawUpdateColumns
} from '@airport/tarmaq-query';

export interface IFunctionAndOperatorHub {

  functions: IFunctionsAndOperators;
  F: IFunctionsAndOperators;

}

export interface IEntityAccumulator {
  add(
    clazz: any,
    index: number,
  ): void
}

export interface IEntityRecord {
  entity: {
    index: number
    name: string
  }
  application: {
    domain: string
    name: string
  }
}

export interface IApplicationHub {

  entityMap: Map<any, IEntityRecord>

  applications: DbApplication[];
  A: DbApplication[];

  qApplications: QApp[];
  Q: QApp[];

  QM: { [name: string]: QApp };

  setQApp(
    qApplication: QApp
  ): void

  getCurrentDbApplicationVersion(
    domainName: string,
    applicationName: string
  ): DbApplicationVersion

  getDbEntity(
    domainName: string,
    applicationName: string,
    entityName: string
  ): DbEntity

}

export interface IAirportDatabase
  extends IApplicationHub,
  IFunctionAndOperatorHub {

  find: INonEntityFind
  findOne: INonEntityFindOne
  search: INonEntitySearch
  searchOne: INonEntitySearchOne

  load(): Promise<any>

  getAccumulator(
    domain: string,
    application: string,
  ): IEntityAccumulator

  insertColumnValues<IQE extends IQEntity>(
    rawInsertValues: RawInsertColumnValues<IQE> | {
      (...args: any[]): RawInsertColumnValues<IQE>;
    },
    context?: IEntityContext,
  ): Promise<number>;

  insertValues<IQE extends IQEntity>(
    rawInsertValues: RawInsertValues<IQE> | {
      (...args: any[]): RawInsertValues<IQE>
    },
    context?: IEntityContext,
  ): Promise<number>;

  insertColumnValuesGenerateIds<IQE extends IQEntity>(
    rawInsertValues: RawInsertColumnValues<IQE> | {
      (...args: any[]): RawInsertColumnValues<IQE>;
    },
    context?: IEntityContext,
  ): Promise<number[] | string[] | number[][] | string[][]>;

  insertValuesGenerateIds<IQE extends IQEntity>(
    rawInsertValues: RawInsertValues<IQE> | {
      (...args: any[]): RawInsertValues<IQE>
    },
    context?: IEntityContext,
  ): Promise<number[] | string[] | number[][] | string[][]>;

  /**
   * Creates an entity with a WHERE clause - internal API.  Use the
   *  API provided by the IEntityDatabaseFacade.
   *
   * @return Number of records deleted
   */
  deleteWhere<IQE extends IQEntity>(
    rawDelete: RawDelete<IQE> | {
      (...args: any[]): RawDelete<IQE>
    },
    context?: IEntityContext,
  ): Promise<number>;

  /**
   * Ether creates or updates an entity - internal API.  Use the
   *  API provided by the IEntityDatabaseFacade.
   *
   * @return Number of records saved (1 or 0)
   */
  save<E>(
    entity: E,
    context?: IEntityContext,
    operationName?: OperationName,
  ): Promise<ISaveResult>;

  /**
   * Updates an entity with a WHERE clause, using a column based set clause
   * - internal API.  Use the API provided by the IEntityDatabaseFacade.
   *
   * @return Number of records updated
   */
  updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(
    rawUpdateColumns: RawUpdateColumns<IEUC, IQE>
      | {
        (...args: any[]): RawUpdateColumns<IEUC, IQE>
      },
    context?: IEntityContext,
  ): Promise<number>;

  /**
   * Updates an entity with a WHERE clause, using a property based set clause
   * - internal API.  Use the API provided by the IEntityDatabaseFacade.
   *
   * @return Number of records updated
   */
  updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(
    rawUpdate: RawUpdate<IEntityUpdateProperties, IQE> | {
      (...args: any[]): RawUpdate<IEUP, IQE>
    },
    context?: IEntityContext,
  ): Promise<number>;

}

export interface QAppInternal
  extends QApp {
  __constructors__?: { [name: string]: EntityConstructor }
  __qConstructors__?: { [name: string]: QEntityConstructor<any> };
  __qIdRelationConstructors__?: typeof QRelation[];
  __dbDbApplication__?: DbApplication;
}
