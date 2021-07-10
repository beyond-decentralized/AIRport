import { UPDATE_CACHE, UpdateCacheType, valuesEqual } from '@airport/air-control';
import { DI } from '@airport/di';
import { EntityRelationType, SQLDataType } from '@airport/ground-control';
/**
 * Server side update cache.  Used if a DAO is used on the server or if a particular DAO
 * operation is not in Autopilot mode.
 */
export class UpdateCache {
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
            || cacheForUpdate === UpdateCacheType.NONE) {
            return;
        }
        this.saveToUpdateCacheInternal(schemaUtils, cacheForUpdate, dbEntity, ...entities);
    }
    getEntityUpdateCache(entity) {
        return entity.__original__;
    }
    getEntityUpdateDiff(schemaUtils, dbEntity, entity, failOnNoOriginalRecord = true) {
        let updateDiff = {};
        let originalRecord = this.getEntityUpdateCache(entity);
        let currentRecord = this.getEntityCacheEntry(schemaUtils, UpdateCacheType.ROOT_QUERY_ENTITIES, dbEntity, entity, {});
        if (!originalRecord) {
            return entity;
        }
        for (let columnName in originalRecord) {
            let originalValue = originalRecord[columnName];
            let newValue = currentRecord[columnName];
            if (!valuesEqual(originalValue, newValue)) {
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
            entity.__original__ = {};
            this.getEntityCacheEntry(schemaUtils, cacheForUpdate, dbEntity, entity, entity.__original__);
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
                    case EntityRelationType.ONE_TO_MANY:
                        if (cacheForUpdate !== UpdateCacheType.ALL_QUERY_ENTITIES) {
                            continue;
                        }
                        if (!(value instanceof Array)) {
                            throw new Error(`Expecting @OneToMany for an array entity relation`);
                        }
                        value.forEach((manyObject) => {
                            this.saveToUpdateCacheInternal(schemaUtils, cacheForUpdate, dbRelation.relationEntity, manyObject);
                        });
                        break;
                    case EntityRelationType.MANY_TO_ONE:
                        if (!(value instanceof Object) || value instanceof Array) {
                            throw new Error(`Expecting @ManyToOne for a non-array entity relation`);
                        }
                        schemaUtils.forEachColumnOfRelation(dbRelation, entity, (dbColumn, value, propertyNameChains) => {
                            this.copyColumn(schemaUtils, dbColumn, entityCopy, value);
                        }, false);
                        if (cacheForUpdate !== UpdateCacheType.ALL_QUERY_ENTITIES) {
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
            case SQLDataType.BOOLEAN:
            case SQLDataType.NUMBER:
            case SQLDataType.ANY:
                entityCopy[columnName] = value;
                break;
            case SQLDataType.STRING:
            case SQLDataType.JSON:
                entityCopy[columnName] = value.slice(0);
                break;
            case SQLDataType.DATE:
                entityCopy[columnName] = new Date(value.getTime());
                break;
            default:
                throw new Error(`Unknown SQLDataType: ${dbColumn.type}`);
        }
    }
}
DI.set(UPDATE_CACHE, UpdateCache);
//# sourceMappingURL=UpdateCache.js.map