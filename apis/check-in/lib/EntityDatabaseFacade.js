import { EntityFind, EntityFindOne, EntitySearch, EntitySearchOne } from "@airport/air-control";
import { Dmo } from "./Dmo";
/**
 * Created by Papa on 12/11/2016.
 */
export class EntityDatabaseFacade {
    constructor(dbEntity, Q, utils) {
        this.dbEntity = dbEntity;
        this.Q = Q;
        this.utils = utils;
        this.dmo = new Dmo(dbEntity);
    }
    get from() {
        return this.Q[this.dbEntity.name];
    }
    initialize(databaseFacade) {
        this.common = databaseFacade;
        this.find = new EntityFind(this.dbEntity, databaseFacade, this.utils);
        this.findOne = new EntityFindOne(this.dbEntity, databaseFacade, this.utils);
        this.search = new EntitySearch(this.dbEntity, databaseFacade, this.utils);
        this.searchOne = new EntitySearchOne(this.dbEntity, databaseFacade, this.utils);
    }
    releaseCachedForUpdate(updateCacheType, ...entities) {
        this.common.releaseCachedForUpdate(updateCacheType, this.dbEntity, ...entities);
    }
    async create(entity) {
        return await this.common.create(this.dbEntity, entity);
    }
    async bulkCreate(entities, checkIfProcessed = true, cascade = false) {
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
//# sourceMappingURL=EntityDatabaseFacade.js.map