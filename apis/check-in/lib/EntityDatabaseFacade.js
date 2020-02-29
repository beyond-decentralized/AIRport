import { DB_FACADE, EntityFind, EntityFindOne, EntitySearch, EntitySearchOne } from '@airport/air-control';
import { DI } from '@airport/di';
import { CascadeOverwrite } from '@airport/ground-control';
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
    async create(entity, cascadeGraph) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.create(this.dbEntity, entity, cascadeGraph);
    }
    async bulkCreate(entities, cascadeOverwrite = CascadeOverwrite.DEFAULT, checkIfProcessed = true) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.bulkCreate(this.dbEntity, entities, checkIfProcessed, cascadeOverwrite);
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
    async update(entity, cascadeGraph) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.update(this.dbEntity, entity, cascadeGraph);
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
    async delete(entity) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.delete(this.dbEntity, entity);
    }
    async deleteWhere(rawDelete) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.deleteWhere(this.dbEntity, rawDelete);
    }
    async save(entity, cascadeGraph) {
        const dbFacade = await DI.db().get(DB_FACADE);
        return await dbFacade.save(this.dbEntity, entity, cascadeGraph);
    }
}
//# sourceMappingURL=EntityDatabaseFacade.js.map