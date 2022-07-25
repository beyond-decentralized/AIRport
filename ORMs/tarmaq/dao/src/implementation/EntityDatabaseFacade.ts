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
import { QApplication } from '@airport/aviation-communication'
import {
  DbEntity,
  ISaveResult
} from '@airport/ground-control';
import { IEntityDatabaseFacade } from '../definition/IEntityDatabaseFacade';
import { IEntityFind } from '../definition/query/EntityFind';
import { IEntityFindOne } from '../definition/query/EntityFindOne';
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
  ApplicationEntity_LocalId extends IEntityIdProperties,
  EntityCascadeGraph extends IEntityCascadeGraph,
  IQ extends IQEntity>
  implements IEntityDatabaseFacade<Entity, EntitySelect,
  EntityCreate, EntityUpdateColumns,
  EntityUpdateProperties, ApplicationEntity_LocalId,
  EntityCascadeGraph, IQ> {

  find: IEntityFind<Entity, Array<Entity>, EntitySelect>;

  findOne: IEntityFindOne<Entity, EntitySelect>;

  // search: IEntitySearch<Entity, Array<Entity>, EntitySelect>;

  // searchOne: IEntitySearchOne<Entity, EntitySelect>;

  constructor(
    public dbEntity: DbEntity,
    private Q: QApplication,
    protected dao: IDao<Entity, EntitySelect,
      EntityCreate, EntityUpdateColumns,
      EntityUpdateProperties, ApplicationEntity_LocalId,
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
    ctx?: IEntityContext,
  ): Promise<number> {
    return await this.withDbEntity(ctx, async (
      databaseFacade: IDatabaseFacade,
      ctx: IEntityContext,
    ) => {
      return await databaseFacade.insertColumnValues(rawInsertColumnValues, ctx);
    });
  }

  async insertValues<IQE extends IQEntity>(
    rawInsertValues: RawInsertValues<IQE> | {
      (...args: any[]): RawInsertValues<IQE>;
    },
    ctx?: IEntityContext,
  ): Promise<number> {
    return await this.withDbEntity(ctx, async (
      databaseFacade: IDatabaseFacade,
      ctx: IEntityContext,
    ) => {
      return await databaseFacade.insertValues(rawInsertValues, ctx);
    });
  }

  async insertColumnValuesGenerateIds<IQE extends IQEntity>(
    rawInsertColumnValues: RawInsertColumnValues<IQE> | {
      (...args: any[]): RawInsertColumnValues<IQE>;
    },
    ctx?: IEntityContext,
  ): Promise<number[] | string[] | number[][] | string[][]> {
    return await this.withDbEntity(ctx, async (
      databaseFacade: IDatabaseFacade,
      ctx: IEntityContext,
    ) => {
      return await databaseFacade.insertColumnValuesGenerateIds(rawInsertColumnValues, ctx);
    });
  }

  async insertValuesGenerateIds<IQE extends IQEntity>(
    rawInsertValues: RawInsertValues<IQE> | {
      (...args: any[]): RawInsertValues<IQE>;
    },
    ctx?: IEntityContext,
  ): Promise<number[] | string[] | number[][] | string[][]> {
    return await this.withDbEntity(ctx, async (
      databaseFacade: IDatabaseFacade,
      ctx: IEntityContext,
    ) => {
      return await databaseFacade.insertValuesGenerateIds(rawInsertValues, ctx);
    });
  }

  async updateColumnsWhere(
    rawUpdateColumns: RawUpdate<EntityUpdateColumns, IQ> | {
      (...args: any[])
        : RawUpdate<EntityUpdateColumns, IQ>
    },
    ctx?: IEntityContext,
  ): Promise<number> {
    return await this.withDbEntity(ctx, async (
      databaseFacade: IDatabaseFacade,
      ctx: IEntityContext,
    ) => {
      return await databaseFacade.updateColumnsWhere(rawUpdateColumns, ctx);
    });
  }

  async updateWhere(
    rawUpdate: RawUpdate<EntityUpdateProperties, IQ> | {
      (...args: any[])
        : RawUpdate<EntityUpdateProperties, IQ>
    },
    ctx?: IEntityContext,
  ): Promise<number> {
    return await this.withDbEntity(ctx, async (
      databaseFacade: IDatabaseFacade,
      ctx: IEntityContext,
    ) => {
      return await databaseFacade.updateWhere(rawUpdate, ctx);
    });
  }

  async deleteWhere(
    rawDelete: RawDelete<IQ> | { (...args: any[]): RawDelete<IQ> },
    ctx?: IEntityContext,
  ): Promise<number> {
    return await this.withDbEntity(ctx, async (
      databaseFacade: IDatabaseFacade,
      ctx: IEntityContext,
    ) => {
      return await databaseFacade.deleteWhere(rawDelete, ctx);
    });
  }

  async save(
    entity: EntityCreate,
    ctx?: IEntityContext,
  ): Promise<ISaveResult> {
    return await this.withDbEntity(ctx, async (
      databaseFacade: IDatabaseFacade,
      ctx: IEntityContext,
    ) => {
      return await databaseFacade.save(entity, ctx);
    });
  }

  /**
   * @return ISaveResult object with metadata on saved objects
   */
  async saveToDestination(
    repositoryDestination: string,
    entity: EntityCreate,
    ctx?: IEntityContext,
  ): Promise<ISaveResult> {
    return await this.withDbEntity(ctx, async (
      databaseFacade: IDatabaseFacade,
      ctx: IEntityContext,
    ) => {
      return await databaseFacade.saveToDestination(repositoryDestination, entity, ctx);
    });
  }

  protected async withDbEntity<R>(
    ctx: IEntityContext,
    callback: {
      (
        databaseFacade: IDatabaseFacade,
        ctx: IEntityContext,
      ): Promise<R>
    },
  ): Promise<R> {
    if (!ctx) {
      ctx = {} as any;
    }
    if (!ctx.startedAt) {
      ctx.startedAt = new Date();
    }
    const previousEntity = ctx.dbEntity;
    ctx.dbEntity = this.dbEntity;
    try {

      return await callback(this.dao.databaseFacade, ctx);
    } finally {
      ctx.dbEntity = previousEntity;
    }
  }

}
