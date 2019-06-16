"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const Duo_1 = require("./Duo");
/**
 * Created by Papa on 12/11/2016.
 */
class EntityDatabaseFacade {
    constructor(dbEntity, Q) {
        this.dbEntity = dbEntity;
        this.Q = Q;
        this.duo = new Duo_1.Duo(dbEntity);
    }
    get from() {
        return this.Q[this.dbEntity.name];
    }
    initialize() {
        this.find = new air_control_1.EntityFind(this.dbEntity);
        this.findOne = new air_control_1.EntityFindOne(this.dbEntity);
        this.search = new air_control_1.EntitySearch(this.dbEntity);
        this.searchOne = new air_control_1.EntitySearchOne(this.dbEntity);
    }
    async releaseCachedForUpdate(updateCacheType, ...entities) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.releaseCachedForUpdate(updateCacheType, this.dbEntity, ...entities);
    }
    async create(entity) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.create(this.dbEntity, entity);
    }
    async bulkCreate(entities, cascade = false, checkIfProcessed = true) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.bulkCreate(this.dbEntity, entities, checkIfProcessed, cascade);
    }
    async insertColumnValues(rawInsertColumnValues) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.insertColumnValues(this.dbEntity, rawInsertColumnValues);
    }
    async insertValues(rawInsertValues) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.insertValues(this.dbEntity, rawInsertValues);
    }
    async insertColumnValuesGenerateIds(rawInsertColumnValues) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.insertColumnValuesGenerateIds(this.dbEntity, rawInsertColumnValues);
    }
    async insertValuesGenerateIds(rawInsertValues) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.insertValuesGenerateIds(this.dbEntity, rawInsertValues);
    }
    async update(entity) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.update(this.dbEntity, entity);
    }
    async updateColumnsWhere(rawUpdateColumns) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.updateColumnsWhere(this.dbEntity, rawUpdateColumns);
    }
    async updateWhere(rawUpdate) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.updateWhere(this.dbEntity, rawUpdate);
    }
    async delete(entity) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.delete(this.dbEntity, entity);
    }
    async deleteWhere(rawDelete) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.deleteWhere(this.dbEntity, rawDelete);
    }
    async save(entity) {
        const dbFacade = await di_1.DI.get(air_control_1.ENTITY_MANAGER);
        return await dbFacade.save(this.dbEntity, entity);
    }
}
exports.EntityDatabaseFacade = EntityDatabaseFacade;
//# sourceMappingURL=EntityDatabaseFacade.js.map