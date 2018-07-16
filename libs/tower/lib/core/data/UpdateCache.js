"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../InjectionTokens");
let UpdateCache = class UpdateCache {
    constructor(utils) {
        this.utils = utils;
        this.updateCache = [];
        this.saveRun = 0;
    }
    dropCache() {
        this.updateCache = [];
    }
    addToCache(cacheForUpdate, dbEntity, ...entities) {
        this.saveRun++;
        this.saveToUpdateCacheInternal(cacheForUpdate, dbEntity, ...entities);
    }
    dropFromCache(cacheForUpdate, dbEntity, ...entities) {
        const entityCache = this.getEntityCache(dbEntity);
        for (const entity of entities) {
            const id = this.utils.Schema.getIdKey(entity, dbEntity);
            delete entityCache[id];
            for (const dbProperty of dbEntity.properties) {
                let value = entity[dbProperty.name];
                if (this.utils.Schema.isEmpty(value)) {
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
                            this.dropFromCache(cacheForUpdate, relation.relationEntity, manyObject);
                        });
                        break;
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        if (!(value instanceof Object) || value instanceof Array) {
                            throw `Expecting @ManyToOne for a non-array entity relation`;
                        }
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.ALL_QUERY_ENTITIES) {
                            continue;
                        }
                        this.dropFromCache(cacheForUpdate, relation.relationEntity, value);
                        break;
                    default:
                        throw `Unknown relation type: ${relation.relationType}`;
                }
            }
        }
    }
    getEntityUpdateCache(dbEntity, entity) {
        let entityCache = this.getEntityCache(dbEntity);
        let compositeId = this.utils.Schema.getIdKey(entity, dbEntity, false);
        if (!compositeId) {
            return null;
        }
        return entityCache[compositeId];
    }
    getOriginalRecord(dbEntity, idKey) {
        const entityCache = this.getEntityCache(dbEntity);
        return entityCache[idKey];
    }
    getEntityUpdateDiff(dbEntity, entity, failOnNoOriginalRecord = true) {
        let updateDiff = {};
        let originalRecord = this.getEntityUpdateCache(dbEntity, entity);
        let currentRecord = this.getEntityCacheEntry(air_control_1.UpdateCacheType.ROOT_QUERY_ENTITIES, dbEntity, entity, {});
        if (!originalRecord) {
            return entity;
        }
        for (let columnName in originalRecord) {
            let originalValue = originalRecord[columnName];
            let newValue = currentRecord[columnName];
            if (!this.utils.valuesEqual(originalValue, newValue)) {
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
        let schemaCache = this.utils.ensureChildArray(this.updateCache, dbEntity.schemaVersion.schema.index);
        return this.utils.ensureChildMap(schemaCache, dbEntity.index);
    }
    saveToUpdateCacheInternal(cacheForUpdate, dbEntity, ...entities) {
        for (const entity of entities) {
            const compositeIdValue = this.utils.Schema.getIdKey(entity, dbEntity);
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
            this.getEntityCacheEntry(cacheForUpdate, dbEntity, entity, entityCopy);
        }
    }
    getEntityCacheEntry(cacheForUpdate, dbEntity, entity, entityCopy) {
        for (const dbProperty of dbEntity.properties) {
            let value = entity[dbProperty.name];
            if (this.utils.Schema.isEmpty(value)) {
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
                            this.saveToUpdateCacheInternal(cacheForUpdate, dbRelation.relationEntity, manyObject);
                        });
                        break;
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        if (!(value instanceof Object) || value instanceof Array) {
                            throw `Expecting @ManyToOne for a non-array entity relation`;
                        }
                        this.utils.Schema.forEachColumnOfRelation(dbRelation, entity, (dbColumn, value, propertyNameChains) => {
                            this.copyColumn(dbColumn, entityCopy, value);
                        }, false);
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.ALL_QUERY_ENTITIES) {
                            continue;
                        }
                        this.saveToUpdateCacheInternal(cacheForUpdate, dbRelation.relationEntity, value);
                        break;
                    default:
                        throw `Unknown relation type: ${dbRelation.relationType}`;
                }
            }
            else {
                const dbColumn = dbProperty.propertyColumns[0].column;
                this.copyColumn(dbColumn, entityCopy, value);
            }
        }
        return entityCopy;
    }
    copyColumn(dbColumn, entityCopy, value) {
        const columnName = dbColumn.name;
        const copiedValue = entityCopy[columnName];
        if (!this.utils.Schema.isEmpty(copiedValue)
            && this.utils.valuesEqual(copiedValue, value)) {
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
    getUpdateCache(dbEntity, id) {
        const entityCache = this.getEntityCache(dbEntity);
        if (this.utils.Schema.isIdEmpty(id)) {
            return null;
        }
        return entityCache[id];
    }
};
UpdateCache = __decorate([
    typedi_1.Service(InjectionTokens_1.UpdateCacheToken),
    __param(0, typedi_1.Inject(_ => air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], UpdateCache);
exports.UpdateCache = UpdateCache;
//# sourceMappingURL=UpdateCache.js.map