"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const Duo_1 = require("./Duo");
/**
 * Created by Papa on 12/11/2016.
 */
class EntityDatabaseFacade {
    constructor(dbEntity, Q, utils) {
        this.dbEntity = dbEntity;
        this.Q = Q;
        this.utils = utils;
        this.duo = new Duo_1.Duo(dbEntity);
    }
    get from() {
        return this.Q[this.dbEntity.name];
    }
    initialize(databaseFacade) {
        this.common = databaseFacade;
        this.find = new air_control_1.EntityFind(this.dbEntity, databaseFacade, this.utils);
        this.findOne = new air_control_1.EntityFindOne(this.dbEntity, databaseFacade, this.utils);
        this.search = new air_control_1.EntitySearch(this.dbEntity, databaseFacade, this.utils);
        this.searchOne = new air_control_1.EntitySearchOne(this.dbEntity, databaseFacade, this.utils);
    }
    releaseCachedForUpdate(updateCacheType, ...entities) {
        this.common.releaseCachedForUpdate(updateCacheType, this.dbEntity, ...entities);
    }
    async create(entity) {
        return await this.common.create(this.dbEntity, entity);
    }
    async bulkCreate(entities, cascade = false, checkIfProcessed = true) {
        return await this.common.bulkCreate(this.dbEntity, entities, checkIfProcessed, cascade);
    }
    async insertColumnValues(rawInsertColumnValues) {
        return await this.common.insertColumnValues(this.dbEntity, rawInsertColumnValues);
    }
    async insertValues(rawInsertValues) {
        return await this.common.insertValues(this.dbEntity, rawInsertValues);
    }
    async insertColumnValuesGenerateIds(rawInsertColumnValues) {
        return await this.common.insertColumnValuesGenerateIds(this.dbEntity, rawInsertColumnValues);
    }
    async insertValuesGenerateIds(rawInsertValues) {
        return await this.common.insertValuesGenerateIds(this.dbEntity, rawInsertValues);
    }
    async update(entity) {
        return await this.common.update(this.dbEntity, entity);
    }
    async updateColumnsWhere(rawUpdateColumns) {
        return await this.common.updateColumnsWhere(this.dbEntity, rawUpdateColumns);
    }
    async updateWhere(rawUpdate) {
        return await this.common.updateWhere(this.dbEntity, rawUpdate);
    }
    async delete(entity) {
        return await this.common.delete(this.dbEntity, entity);
    }
    async deleteWhere(rawDelete) {
        return await this.common.deleteWhere(this.dbEntity, rawDelete);
    }
    async save(entity) {
        return await this.common.save(this.dbEntity, entity);
    }
}
exports.EntityDatabaseFacade = EntityDatabaseFacade;
//# sourceMappingURL=EntityDatabaseFacade.js.map