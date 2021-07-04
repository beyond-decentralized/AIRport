import { DATABASE_FACADE, ENTITY_STATE_MANAGER, EntityFind, EntityFindOne, EntitySearch, EntitySearchOne, } from '@airport/air-control';
import { DI } from '@airport/di';
/**
 * Created by Papa on 12/11/2016.
 */
export class EntityDatabaseFacade {
    constructor(dbEntity, Q) {
        this.dbEntity = dbEntity;
        this.Q = Q;
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
    // 	const dbFacade = await DI.get(DATABASE_FACADE)
    // 	return await dbFacade.releaseCachedForUpdate(updateCacheType, this.dbEntity,
    // ...entities) }
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
    identifyObjects(entity, ctx, operationUniqueIdSeq) {
        const entityStateManager = DI.db()
            .getSync(ENTITY_STATE_MANAGER);
        if (!operationUniqueIdSeq) {
            operationUniqueIdSeq = entityStateManager.getOperationUniqueIdSeq();
        }
        const operationUniqueId = entityStateManager.getOperationUniqueId(entity);
        if (operationUniqueId) {
            return;
        }
        entityStateManager.uniquelyIdentify(entity, operationUniqueIdSeq);
        Object.keys(entity)
            .forEach(propertyKey => {
            const property = entity[propertyKey];
            if (property instanceof Array) {
                for (const propertyValue of property) {
                    if (propertyValue instanceof Object) {
                        this.identifyObjects(propertyValue, ctx, operationUniqueIdSeq);
                    }
                }
            }
            else if (property instanceof Object) {
                this.identifyObjects(property, ctx, operationUniqueIdSeq);
            }
        });
    }
}
//# sourceMappingURL=EntityDatabaseFacade.js.map