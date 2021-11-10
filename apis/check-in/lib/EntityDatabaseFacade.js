import { DATABASE_FACADE, EntityFind, EntityFindOne, EntityLookup, } from '@airport/air-control';
import { DI } from '@airport/di';
/**
 * Created by Papa on 12/11/2016.
 */
export class EntityDatabaseFacade {
    // search: IEntitySearch<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
    // searchOne: IEntitySearchOne<Entity, EntitySelect>;
    constructor(dbEntity, Q) {
        this.dbEntity = dbEntity;
        this.Q = Q;
        this.find = new EntityFind(this.dbEntity);
        this.findOne = new EntityFindOne(this.dbEntity);
        // this.search = new EntitySearch<Entity, Array<Entity>, EntitySelect>(
        //   this.dbEntity);
        // this.searchOne = new EntitySearchOne(this.dbEntity);
    }
    get from() {
        return this.Q[this.dbEntity.name];
    }
    findForRepository(repositorySource, repositoryUuid) {
        return new EntityFind(this.dbEntity, EntityLookup.mapResults, repositorySource, repositoryUuid);
    }
    findOneForRepository(repositorySource, repositoryUuid) {
        return new EntityFindOne(this.dbEntity, EntityLookup.mapResults, repositorySource, repositoryUuid);
    }
    async insertColumnValues(rawInsertColumnValues, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.insertColumnValues(rawInsertColumnValues, ctx);
        });
    }
    async insertValues(rawInsertValues, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.insertValues(rawInsertValues, ctx);
        });
    }
    async insertColumnValuesGenerateIds(rawInsertColumnValues, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.insertColumnValuesGenerateIds(rawInsertColumnValues, ctx);
        });
    }
    async insertValuesGenerateIds(rawInsertValues, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.insertValuesGenerateIds(rawInsertValues, ctx);
        });
    }
    async updateColumnsWhere(rawUpdateColumns, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.updateColumnsWhere(rawUpdateColumns, ctx);
        });
    }
    async updateWhere(rawUpdate, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.updateWhere(rawUpdate, ctx);
        });
    }
    async deleteWhere(rawDelete, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.deleteWhere(rawDelete, ctx);
        });
    }
    async save(entity, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.save(entity, ctx);
        });
    }
    /**
     * @return ISaveResult object with metadata on saved objects
     */
    async saveToDestination(repositoryDestination, entity, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.saveToDestination(repositoryDestination, entity, ctx);
        });
    }
    async withDbEntity(ctx, callback) {
        if (!ctx) {
            ctx = {};
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
        }
        finally {
            ctx.dbEntity = previousEntity;
        }
    }
}
//# sourceMappingURL=EntityDatabaseFacade.js.map