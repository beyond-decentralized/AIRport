"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
class UpdateCache {
    // private updateCache: EntityUpdateCache[][] = []
    // private saveRun                            = 0
    // dropCache(): void {
    // 	this.updateCache = []
    // }
    /**
     * Start Context for an UpdateProperties Operation.  All entity update operations must
     * be performed on cached entities.
     *
     * This starts recording all queries and allows the update to diff recorded
     * query results with the updated object to get the actual changed fields.
     *
     * @param {Entity} entities
     */
    addToCache(schemaUtils, cacheForUpdate, dbEntity, ...entities) {
        if (!entities || !entities.length
            || cacheForUpdate === air_control_1.UpdateCacheType.NONE) {
            return;
        }
        this.saveToUpdateCacheInternal(schemaUtils, cacheForUpdate, dbEntity, ...entities);
    }
    getEntityUpdateCache(entity) {
        return entity.__updateCache__;
    }
    getEntityUpdateDiff(schemaUtils, dbEntity, entity, failOnNoOriginalRecord = true) {
        let updateDiff = {};
        let originalRecord = this.getEntityUpdateCache(entity);
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
    saveToUpdateCacheInternal(schemaUtils, cacheForUpdate, dbEntity, ...entities) {
        for (const entity of entities) {
            entity.__updateCache__ = {};
            this.getEntityCacheEntry(schemaUtils, cacheForUpdate, dbEntity, entity, entity.__updateCache__);
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
                            throw new Error(`Expecting @OneToMany for an array entity relation`);
                        }
                        value.forEach((manyObject) => {
                            this.saveToUpdateCacheInternal(schemaUtils, cacheForUpdate, dbRelation.relationEntity, manyObject);
                        });
                        break;
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        if (!(value instanceof Object) || value instanceof Array) {
                            throw new Error(`Expecting @ManyToOne for a non-array entity relation`);
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
                        throw new Error(`Unknown relation type: ${dbRelation.relationType}`);
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
        // if (!schemaUtils.isEmpty(copiedValue)
        // 	&& valuesEqual(copiedValue, value)) {
        // 	throw new Error(`Values do not match for column
        // '${dbColumn.propertyColumns[0].property.entity.name}.${dbColumn.name}'`) }
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
                throw new Error(`Unknown SQLDataType: ${dbColumn.type}`);
        }
    }
}
exports.UpdateCache = UpdateCache;
di_1.DI.set(air_control_1.UPDATE_CACHE, UpdateCache);
//# sourceMappingURL=UpdateCache.js.map