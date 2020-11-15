import { DB_FACADE, EntityFind, EntityFindOne, EntitySearch, EntitySearchOne } from '@airport/air-control';
import { DI } from '@airport/di';
import { Duo } from './Duo';
/**
 * Created by Papa on 12/11/2016.
 */
export class EntityDatabaseFacade {
    constructor(dbEntity, Q) {
        this.dbEntity = dbEntity;
        this.Q = Q;
        this.duo = new Duo(dbEntity);
        this.find = new EntityFind(this.dbEntity);
        this.findOne = new EntityFindOne(this.dbEntity);
        this.search = new EntitySearch(this.dbEntity);
        this.searchOne = new EntitySearchOne(this.dbEntity);
    }
    get from() {
        return this.Q[this.dbEntity.name];
    }
    //
    // async releaseCachedForUpdate(
    // 	updateCacheType: UpdateCacheType,
    // 	...entities: Entity[]
    // ): Promise<void> {
    // 	const dbFacade = await DI.get(DB_FACADE)
    // 	return await dbFacade.releaseCachedForUpdate(updateCacheType, this.dbEntity,
    // ...entities) }
    async create(entity, ctx, operationName) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.create(entity, ctx, operationName);
        });
    }
    async bulkCreate(entities, checkIfProcessed = true, ctx, operationName) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.bulkCreate(entities, ctx, checkIfProcessed, operationName);
        });
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
    async update(entity, ctx, operationName) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.update(entity, ctx, operationName);
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
    // NOTE: Delete cascading is done on the server, no input is needed
    async delete(entity, ctx, operationName) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.delete(entity, ctx, operationName);
        });
    }
    async deleteWhere(rawDelete, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.deleteWhere(rawDelete, ctx);
        });
    }
    async save(entity, ctx, operationName) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.save(entity, ctx, operationName);
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
            .get(DB_FACADE);
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