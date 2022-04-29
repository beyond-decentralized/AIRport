import { DATABASE_FACADE, EntityFind, EntityFindOne, } from '@airport/air-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
/**
 * Created by Papa on 12/11/2016.
 */
export class EntityDatabaseFacade {
    // search: IEntitySearch<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
    // searchOne: IEntitySearchOne<Entity, EntitySelect>;
    constructor(dbEntity, Q, updateCacheManager) {
        this.dbEntity = dbEntity;
        this.Q = Q;
        this.find = new EntityFind(this.dbEntity, updateCacheManager);
        this.findOne = new EntityFindOne(this.dbEntity, updateCacheManager);
        // this.search = new EntitySearch<Entity, Array<Entity>, EntitySelect>(
        //   this.dbEntity, updateCacheManager);
        // this.searchOne = new EntitySearchOne(this.dbEntity, updateCacheManager);
    }
    get from() {
        return this.Q[this.dbEntity.name];
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
        const databaseFacade = await DEPENDENCY_INJECTION.db()
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