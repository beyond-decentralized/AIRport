"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../../diTokens");
class UpdateCache {
    constructor() {
        this.updateCache = [];
        this.saveRun = 0;
        /*
            private getUpdateCache(
                schemaUtils: ISchemaUtils,
                dbEntity: DbEntity,
                id: string
            ): any {
                const entityCache = this.getEntityCache(dbEntity)
                if (schemaUtils.isIdEmpty(id)) {
                    return null
                }
        
                return entityCache[id]
            }
        */
    }
    dropCache() {
        this.updateCache = [];
    }
    addToCache(schemaUtils, cacheForUpdate, dbEntity, ...entities) {
        if (!entities || !entities.length
            || cacheForUpdate === air_control_1.UpdateCacheType.NONE) {
            return;
        }
        this.saveRun++;
        this.saveToUpdateCacheInternal(schemaUtils, cacheForUpdate, dbEntity, ...entities);
    }
    dropFromCache(schemaUtils, cacheForUpdate, dbEntity, ...entities) {
        const entityCache = this.getEntityCache(dbEntity);
        for (const entity of entities) {
            const id = schemaUtils.getIdKey(entity, dbEntity);
            delete entityCache[id];
            for (const dbProperty of dbEntity.properties) {
                let value = entity[dbProperty.name];
                if (schemaUtils.isEmpty(value)) {
                    continue;
                }
                if (!dbProperty.relation) {
                    continue;
                }
                const relation = dbProperty.relation[0];
                switch (relation.relationType) {
                    case ground_control_1.EntityRelationType.ONE_TO_MANY:
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.ALL_QUERY_ENTITIES) {
                            continue;
                        }
                        if (!(value instanceof Array)) {
                            throw `Expecting @OneToMany for an array entity relation`;
                        }
                        value.forEach((manyObject) => {
                            this.dropFromCache(schemaUtils, cacheForUpdate, relation.relationEntity, manyObject);
                        });
                        break;
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        if (!(value instanceof Object) || value instanceof Array) {
                            throw `Expecting @ManyToOne for a non-array entity relation`;
                        }
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.ALL_QUERY_ENTITIES) {
                            continue;
                        }
                        this.dropFromCache(schemaUtils, cacheForUpdate, relation.relationEntity, value);
                        break;
                    default:
                        throw `Unknown relation type: ${relation.relationType}`;
                }
            }
        }
    }
    getEntityUpdateCache(schemaUtils, dbEntity, entity) {
        let entityCache = this.getEntityCache(dbEntity);
        let compositeId = schemaUtils.getIdKey(entity, dbEntity, false);
        if (!compositeId) {
            return null;
        }
        return entityCache[compositeId];
    }
    getOriginalRecord(dbEntity, idKey) {
        const entityCache = this.getEntityCache(dbEntity);
        return entityCache[idKey];
    }
    getEntityUpdateDiff(schemaUtils, dbEntity, entity, failOnNoOriginalRecord = true) {
        let updateDiff = {};
        let originalRecord = this.getEntityUpdateCache(schemaUtils, dbEntity, entity);
        let currentRecord = this.getEntityCacheEntry(schemaUtils, air_control_1.UpdateCacheType.ROOT_QUERY_ENTITIES, dbEntity, entity, {});
        if (!originalRecord) {
            return entity;
        }
        for (let columnName in originalRecord) {
            let originalValue = originalRecord[columnName];
            let newValue = currentRecord[columnName];
            if (!air_control_1.valuesEqual(originalValue, newValue)) {
                updateDiff[columnName] = newValue;
            }
        }
        for (let columnName in currentRecord) {
            if (updateDiff[columnName]) {
                continue;
            }
            updateDiff[columnName] = entity[columnName];
        }
        return updateDiff;
    }
    getEntityCache(dbEntity) {
        let schemaCache = ground_control_1.ensureChildArray(this.updateCache, dbEntity.schemaVersion.schema.index);
        return ground_control_1.ensureChildMap(schemaCache, dbEntity.index);
    }
    saveToUpdateCacheInternal(schemaUtils, cacheForUpdate, dbEntity, ...entities) {
        for (const entity of entities) {
            const compositeIdValue = schemaUtils.getIdKey(entity, dbEntity);
            // If no id is provided for an entity, it cannot be cached
            if (!compositeIdValue) {
                throw `Cannot cache entities with no ids`;
            }
            let entityCache = this.getEntityCache(dbEntity);
            let entityCopy = entityCache[compositeIdValue];
            if (entityCopy) {
                if (entityCopy.__saveRun__ === this.saveRun) {
                    return entityCopy;
                }
                entityCopy.__saveRun__ = this.saveRun;
            }
            else {
                entityCopy = {
                    __saveRun__: this.saveRun
                };
            }
            entityCache[compositeIdValue] = entityCopy;
            this.getEntityCacheEntry(schemaUtils, cacheForUpdate, dbEntity, entity, entityCopy);
        }
    }
    getEntityCacheEntry(schemaUtils, cacheForUpdate, dbEntity, entity, entityCopy) {
        for (const dbProperty of dbEntity.properties) {
            let value = entity[dbProperty.name];
            if (schemaUtils.isEmpty(value)) {
                continue;
            }
            if (dbProperty.relation) {
                const dbRelation = dbProperty.relation[0];
                switch (dbRelation.relationType) {
                    case ground_control_1.EntityRelationType.ONE_TO_MANY:
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.ALL_QUERY_ENTITIES) {
                            continue;
                        }
                        if (!(value instanceof Array)) {
                            throw `Expecting @OneToMany for an array entity relation`;
                        }
                        value.forEach((manyObject) => {
                            this.saveToUpdateCacheInternal(schemaUtils, cacheForUpdate, dbRelation.relationEntity, manyObject);
                        });
                        break;
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        if (!(value instanceof Object) || value instanceof Array) {
                            throw `Expecting @ManyToOne for a non-array entity relation`;
                        }
                        schemaUtils.forEachColumnOfRelation(dbRelation, entity, (dbColumn, value, propertyNameChains) => {
                            this.copyColumn(schemaUtils, dbColumn, entityCopy, value);
                        }, false);
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.ALL_QUERY_ENTITIES) {
                            continue;
                        }
                        this.saveToUpdateCacheInternal(schemaUtils, cacheForUpdate, dbRelation.relationEntity, value);
                        break;
                    default:
                        throw `Unknown relation type: ${dbRelation.relationType}`;
                }
            }
            else {
                const dbColumn = dbProperty.propertyColumns[0].column;
                this.copyColumn(schemaUtils, dbColumn, entityCopy, value);
            }
        }
        return entityCopy;
    }
    copyColumn(schemaUtils, dbColumn, entityCopy, value) {
        const columnName = dbColumn.name;
        const copiedValue = entityCopy[columnName];
        if (!schemaUtils.isEmpty(copiedValue)
            && air_control_1.valuesEqual(copiedValue, value)) {
            throw `Values do not match for column '${dbColumn.propertyColumns[0].property.entity.name}.${dbColumn.name}'`;
        }
        switch (dbColumn.type) {
            case ground_control_1.SQLDataType.BOOLEAN:
            case ground_control_1.SQLDataType.NUMBER:
            case ground_control_1.SQLDataType.ANY:
                entityCopy[columnName] = value;
                break;
            case ground_control_1.SQLDataType.STRING:
            case ground_control_1.SQLDataType.JSON:
                entityCopy[columnName] = value.slice(0);
                break;
            case ground_control_1.SQLDataType.DATE:
                entityCopy[columnName] = new Date(value.getTime());
                break;
            default:
                throw `Unknown SQLDataType: ${dbColumn.type}`;
        }
    }
}
exports.UpdateCache = UpdateCache;
di_1.DI.set(diTokens_1.UPDATE_CACHE, UpdateCache);
//# sourceMappingURL=UpdateCache.js.map