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
    async create(entity, operationName) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.create(this.dbEntity, entity, operationName);
    }
    async bulkCreate(entities, checkIfProcessed = true, operationName) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.bulkCreate(this.dbEntity, entities, checkIfProcessed, operationName);
    }
    async insertColumnValues(rawInsertColumnValues) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.insertColumnValues(this.dbEntity, rawInsertColumnValues);
    }
    async insertValues(rawInsertValues) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.insertValues(this.dbEntity, rawInsertValues);
    }
    async insertColumnValuesGenerateIds(rawInsertColumnValues) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.insertColumnValuesGenerateIds(this.dbEntity, rawInsertColumnValues);
    }
    async insertValuesGenerateIds(rawInsertValues) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.insertValuesGenerateIds(this.dbEntity, rawInsertValues);
    }
    async update(entity, operationName) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.update(this.dbEntity, entity, operationName);
    }
    async updateColumnsWhere(rawUpdateColumns) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.updateColumnsWhere(this.dbEntity, rawUpdateColumns);
    }
    async updateWhere(rawUpdate) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.updateWhere(this.dbEntity, rawUpdate);
    }
    // NOTE: Delete cascading is done on the server, no input is needed
    async delete(entity, operationName) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.delete(this.dbEntity, entity, operationName);
    }
    async deleteWhere(rawDelete) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.deleteWhere(this.dbEntity, rawDelete);
    }
    async save(entity, operationName) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.save(this.dbEntity, entity, operationName);
    }
}
//# sourceMappingURL=EntityDatabaseFacade.js.map