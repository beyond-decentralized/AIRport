import {
  IEntityCascadeGraph,
  IEntityCreateProperties,
  IEntityIdProperties,
  IEntitySelectProperties,
  IEntityUpdateColumns,
  IEntityUpdateProperties,
  IQEntity,
  RawDelete,
  RawInsertColumnValues,
  RawInsertValues,
  RawUpdate,
} from '@airport/tarmaq-query';
import { QApp } from '@airport/aviation-communication'
import {
  DbEntity,
  ISaveResult,
  Repository_GUID
} from '@airport/ground-control';
import { IEntityDatabaseFacade } from '../definition/IEntityDatabaseFacade';
import { IEntityFind } from '../definition/query/IEntityFind';
import { IEntityFindOne } from '../definition/query/IEntityFindOne';
import { IDao } from '../definition/IDao';
import { EntityFind } from './query/EntityFind';
import { EntityFindOne } from './query/EntityFindOne';
import { IDatabaseFacade } from '../definition/IDatabaseFacade';
import { IEntityContext } from '@airport/tarmaq-entity';

/**
 * Created by Papa on 12/11/2016.
 */

export class EntityDatabaseFacade<Entity,
  EntitySelect extends IEntitySelectProperties,
  EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
  EntityUpdateProperties extends IEntityUpdateProperties,
  DbEntity_LocalId extends IEntityIdProperties,
  EntityCascadeGraph extends IEntityCascadeGraph,
  IQ extends IQEntity>
  implements IEntityDatabaseFacade<Entity, EntitySelect,
  EntityCreate, EntityUpdateColumns,
  EntityUpdateProperties, DbEntity_LocalId,
  EntityCascadeGraph, IQ> {

  find: IEntityFind<Entity, Array<Entity>, EntitySelect>;

  findOne: IEntityFindOne<Entity, EntitySelect>;

  // search: IEntitySearch<Entity, Array<Entity>, EntitySelect>;

  // searchOne: IEntitySearchOne<Entity, EntitySelect>;

  constructor(
    public dbEntity: DbEntity,
    private Q: QApp,
    protected dao: IDao<Entity, EntitySelect,
      EntityCreate, EntityUpdateColumns,
      EntityUpdateProperties, DbEntity_LocalId,
      EntityCascadeGraph, IQ>
  ) {
    this.find = new EntityFind<Entity, Array<Entity>, EntitySelect>(
      this.dbEntity, dao);
    this.findOne = new EntityFindOne<Entity, EntitySelect>(
      this.dbEntity, dao);
    // this.search = new EntitySearch<Entity, Array<Entity>, EntitySelect>(
    //   this.dbEntity, updateCacheManager);
    // this.searchOne = new EntitySearchOne(this.dbEntity, updateCacheManager);
  }

  get FROM(): IQ {
    return this.Q[this.dbEntity.name];
  }

  async insertColumnValues<IQE extends IQEntity>(
    rawInsertColumnValues: RawInsertColumnValues<IQE> | {
      (...args: any[]): RawInsertColumnValues<IQE>;
    },
    context?: IEntityContext
  ): Promise<number> {
    return await this.withDbEntity(context, async (
      databaseFacade: IDatabaseFacade,
      context: IEntityContext,
    ) => {
      return await databaseFacade.insertColumnValues(
        rawInsertColumnValues, context);
    });
  }

  async insertValues<IQE extends IQEntity>(
    rawInsertValues: RawInsertValues<IQE> | {
      (...args: any[]): RawInsertValues<IQE>;
    },
    context?: IEntityContext
  ): Promise<number> {
    return await this.withDbEntity(context, async (
      databaseFacade: IDatabaseFacade,
      context: IEntityContext,
    ) => {
      return await databaseFacade.insertValues(
        rawInsertValues, context);
    }, );
  }

  async insertColumnValuesGenerateIds<IQE extends IQEntity>(
    rawInsertColumnValues: RawInsertColumnValues<IQE> | {
      (...args: any[]): RawInsertColumnValues<IQE>;
    },
    context?: IEntityContext
  ): Promise<number[] | string[] | number[][] | string[][]> {
    return await this.withDbEntity(context, async (
      databaseFacade: IDatabaseFacade,
      context: IEntityContext,
    ) => {
      return await databaseFacade.insertColumnValuesGenerateIds(
        rawInsertColumnValues, context);
    });
  }

  async insertValuesGenerateIds<IQE extends IQEntity>(
    rawInsertValues: RawInsertValues<IQE> | {
      (...args: any[]): RawInsertValues<IQE>;
    },
    context?: IEntityContext
  ): Promise<number[] | string[] | number[][] | string[][]> {
    return await this.withDbEntity(context, async (
      databaseFacade: IDatabaseFacade,
      context: IEntityContext,
    ) => {
      return await databaseFacade.insertValuesGenerateIds(
        rawInsertValues, context);
    });
  }

  async updateColumnsWhere(
    rawUpdateColumns: RawUpdate<EntityUpdateColumns, IQ> | {
      (...args: any[])
        : RawUpdate<EntityUpdateColumns, IQ>
    },
    context?: IEntityContext,
		trackedRepoGUIDSet?: Set<Repository_GUID>
  ): Promise<number> {
    return await this.withDbEntity(context, async (
      databaseFacade: IDatabaseFacade,
      context: IEntityContext,
    ) => {
      return await databaseFacade.updateColumnsWhere(
        rawUpdateColumns, context, trackedRepoGUIDSet);
    });
  }

  async updateWhere(
    rawUpdate: RawUpdate<EntityUpdateProperties, IQ> | {
      (...args: any[])
        : RawUpdate<EntityUpdateProperties, IQ>
    },
    context?: IEntityContext,
		trackedRepoGUIDSet?: Set<Repository_GUID>
  ): Promise<number> {
    return await this.withDbEntity(context, async (
      databaseFacade: IDatabaseFacade,
      context: IEntityContext,
    ) => {
      return await databaseFacade.updateWhere(
        rawUpdate, context, trackedRepoGUIDSet);
    });
  }

  async deleteWhere(
    rawDelete: RawDelete<IQ> | { (...args: any[]): RawDelete<IQ> },
    context?: IEntityContext,
		trackedRepoGUIDSet?: Set<Repository_GUID>
  ): Promise<number> {
    return await this.withDbEntity(context, async (
      databaseFacade: IDatabaseFacade,
      context: IEntityContext,
    ) => {
      return await databaseFacade.deleteWhere(
        rawDelete, context, trackedRepoGUIDSet);
    });
  }

  async save(
    entity: EntityCreate,
    context?: IEntityContext,
  ): Promise<ISaveResult> {
    return await this.withDbEntity(context, async (
      databaseFacade: IDatabaseFacade,
      context: IEntityContext,
    ) => {
      return await databaseFacade.save(entity, context);
    });
  }

  /**
   * @return ISaveResult object with metadata on saved objects
   */
  async saveToDestination(
    repositoryDestination: string,
    entity: EntityCreate,
    context?: IEntityContext,
  ): Promise<ISaveResult> {
    return await this.withDbEntity(context, async (
      databaseFacade: IDatabaseFacade,
      context: IEntityContext,
    ) => {
      return await databaseFacade.saveToDestination(repositoryDestination, entity, context);
    });
  }

  protected async withDbEntity<R>(
    context: IEntityContext,
    callback: {
      (
        databaseFacade: IDatabaseFacade,
        context: IEntityContext,
      ): Promise<R>
    },
  ): Promise<R> {
    if (!context) {
      context = {} as any;
    }
    if (!context.startedAt) {
      context.startedAt = new Date();
    }
    const previousEntity = context.dbEntity;
    context.dbEntity = this.dbEntity;
    try {

      return await callback(this.dao.databaseFacade, context);
    } finally {
      context.dbEntity = previousEntity;
    }
  }

}
