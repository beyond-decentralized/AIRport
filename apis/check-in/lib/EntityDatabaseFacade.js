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
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.create(entity, ctx, operationName);
    }
    async bulkCreate(entities, checkIfProcessed = true, ctx, operationName) {
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.bulkCreate(entities, ctx, checkIfProcessed, operationName);
    }
    async insertColumnValues(rawInsertColumnValues, ctx) {
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.insertColumnValues(rawInsertColumnValues, ctx);
    }
    async insertValues(rawInsertValues, ctx) {
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.insertValues(rawInsertValues, ctx);
    }
    async insertColumnValuesGenerateIds(rawInsertColumnValues, ctx) {
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.insertColumnValuesGenerateIds(rawInsertColumnValues, ctx);
    }
    async insertValuesGenerateIds(rawInsertValues, ctx) {
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.insertValuesGenerateIds(rawInsertValues, ctx);
    }
    async update(entity, ctx, operationName) {
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.update(entity, ctx, operationName);
    }
    async updateColumnsWhere(rawUpdateColumns, ctx) {
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.updateColumnsWhere(rawUpdateColumns, ctx);
    }
    async updateWhere(rawUpdate, ctx) {
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.updateWhere(rawUpdate, ctx);
    }
    // NOTE: Delete cascading is done on the server, no input is needed
    async delete(entity, ctx, operationName) {
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.delete(entity, ctx, operationName);
    }
    async deleteWhere(rawDelete, ctx) {
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.deleteWhere(rawDelete, ctx);
    }
    async save(entity, ctx, operationName) {
        const dbFacade = await DI.db()
            .get(DB_FACADE);
        ctx.dbEntity = this.dbEntity;
        return await dbFacade.save(entity, ctx, operationName);
    }
}
//# sourceMappingURL=EntityDatabaseFacade.js.map