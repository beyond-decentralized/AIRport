import {
  DATABASE_FACADE,
  EntityFind,
  EntityFindOne,
  EntityLookup,
  EntitySearch,
  EntitySearchOne,
  IDatabaseFacade,
  IDuo,
  IEntityCascadeGraph,
  IEntityContext,
  IEntityCreateProperties,
  IEntityDatabaseFacade,
  IEntityFind,
  IEntityFindOne,
  IEntityIdProperties,
  IEntitySearch,
  IEntitySearchOne,
  IEntitySelectProperties,
  IEntityUpdateColumns,
  IEntityUpdateProperties,
  IQEntity,
  MappedEntityArray,
  QSchema,
  RawDelete,
  RawInsertColumnValues,
  RawInsertValues,
  RawUpdate,
} from '@airport/air-control';
import { DI } from '@airport/di';
import {
  DbEntity,
  ISaveResult
} from '@airport/ground-control';

/**
 * Created by Papa on 12/11/2016.
 */

export class EntityDatabaseFacade<Entity,
  EntitySelect extends IEntitySelectProperties,
  EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
  EntityUpdateProperties extends IEntityUpdateProperties,
  EntityId extends IEntityIdProperties,
  EntityCascadeGraph extends IEntityCascadeGraph,
  IQ extends IQEntity<Entity>>
  implements IEntityDatabaseFacade<Entity, EntitySelect,
  EntityCreate, EntityUpdateColumns,
  EntityUpdateProperties, EntityId,
  EntityCascadeGraph, IQ> {

  duo: IDuo<Entity, EntitySelect, EntityCreate,
    EntityUpdateColumns, EntityUpdateProperties, EntityId,
    EntityCascadeGraph, IQ>;

  find: IEntityFind<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;

  findOne: IEntityFindOne<Entity, EntitySelect>;

  // search: IEntitySearch<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;

  // searchOne: IEntitySearchOne<Entity, EntitySelect>;

  constructor(
    public dbEntity: DbEntity,
    private Q: QSchema,
  ) {
    this.find = new EntityFind<Entity, Array<Entity>, EntitySelect>(
      this.dbEntity);
    this.findOne = new EntityFindOne<Entity, EntitySelect>(
      this.dbEntity);
    // this.search = new EntitySearch<Entity, Array<Entity>, EntitySelect>(
    //   this.dbEntity);
    // this.searchOne = new EntitySearchOne(this.dbEntity);
  }

  get from(): IQ {
    return this.Q[this.dbEntity.name];
  }

  findForRepository(
    repositorySource: string,
    repositoryUuid: string
  ): IEntityFind<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect> {
    return new EntityFind<Entity, Array<Entity>, EntitySelect>(
      this.dbEntity, EntityLookup.mapResults, repositorySource, repositoryUuid);
  }

  findOneForRepository(
    repositorySource: string,
    repositoryUuid: string
  ): IEntityFindOne<Entity, EntitySelect> {
    return new EntityFindOne<Entity, EntitySelect>(
      this.dbEntity, EntityLookup.mapResults, repositorySource, repositoryUuid);
  }

  async insertColumnValues<IQE extends IQEntity<Entity>>(
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

  async insertValues<IQE extends IQEntity<Entity>>(
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

  async insertColumnValuesGenerateIds<IQE extends IQEntity<Entity>>(
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

  async insertValuesGenerateIds<IQE extends IQEntity<Entity>>(
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
    const databaseFacade = await DI.db()
      .get(DATABASE_FACADE);
    const previousEntity = ctx.dbEntity;
    ctx.dbEntity = this.dbEntity;
    try {

      return await callback(databaseFacade, ctx);
    } finally {
      ctx.dbEntity = previousEntity;
    }
  }

}
