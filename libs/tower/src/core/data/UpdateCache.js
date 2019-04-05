"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var air_control_1 = require("@airport/air-control");
var di_1 = require("@airport/di");
var ground_control_1 = require("@airport/ground-control");
var diTokens_1 = require("../../diTokens");
var UpdateCache = /** @class */ (function () {
    function UpdateCache() {
        var _this = this;
        this.updateCache = [];
        this.saveRun = 0;
        di_1.DI.get(function (utils) {
            _this.utils = utils;
        }, air_control_1.UTILS);
    }
    UpdateCache.prototype.dropCache = function () {
        this.updateCache = [];
    };
    UpdateCache.prototype.addToCache = function (cacheForUpdate, dbEntity) {
        var entities = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            entities[_i - 2] = arguments[_i];
        }
        this.saveRun++;
        this.saveToUpdateCacheInternal.apply(this, [cacheForUpdate, dbEntity].concat(entities));
    };
    UpdateCache.prototype.dropFromCache = function (cacheForUpdate, dbEntity) {
        var _this = this;
        var entities = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            entities[_i - 2] = arguments[_i];
        }
        var entityCache = this.getEntityCache(dbEntity);
        for (var _a = 0, entities_1 = entities; _a < entities_1.length; _a++) {
            var entity = entities_1[_a];
            var id = this.utils.Schema.getIdKey(entity, dbEntity);
            delete entityCache[id];
            var _loop_1 = function (dbProperty) {
                var value = entity[dbProperty.name];
                if (this_1.utils.Schema.isEmpty(value)) {
                    return "continue";
                }
                if (!dbProperty.relation) {
                    return "continue";
                }
                var relation = dbProperty.relation[0];
                switch (relation.relationType) {
                    case ground_control_1.EntityRelationType.ONE_TO_MANY:
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.ALL_QUERY_ENTITIES) {
                            return "continue";
                        }
                        if (!(value instanceof Array)) {
                            throw "Expecting @OneToMany for an array entity relation";
                        }
                        value.forEach(function (manyObject) {
                            _this.dropFromCache(cacheForUpdate, relation.relationEntity, manyObject);
                        });
                        break;
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        if (!(value instanceof Object) || value instanceof Array) {
                            throw "Expecting @ManyToOne for a non-array entity relation";
                        }
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.ALL_QUERY_ENTITIES) {
                            return "continue";
                        }
                        this_1.dropFromCache(cacheForUpdate, relation.relationEntity, value);
                        break;
                    default:
                        throw "Unknown relation type: " + relation.relationType;
                }
            };
            var this_1 = this;
            for (var _b = 0, _c = dbEntity.properties; _b < _c.length; _b++) {
                var dbProperty = _c[_b];
                _loop_1(dbProperty);
            }
        }
    };
    UpdateCache.prototype.getEntityUpdateCache = function (dbEntity, entity) {
        var entityCache = this.getEntityCache(dbEntity);
        var compositeId = this.utils.Schema.getIdKey(entity, dbEntity, false);
        if (!compositeId) {
            return null;
        }
        return entityCache[compositeId];
    };
    UpdateCache.prototype.getOriginalRecord = function (dbEntity, idKey) {
        var entityCache = this.getEntityCache(dbEntity);
        return entityCache[idKey];
    };
    UpdateCache.prototype.getEntityUpdateDiff = function (dbEntity, entity, failOnNoOriginalRecord) {
        if (failOnNoOriginalRecord === void 0) { failOnNoOriginalRecord = true; }
        var updateDiff = {};
        var originalRecord = this.getEntityUpdateCache(dbEntity, entity);
        var currentRecord = this.getEntityCacheEntry(air_control_1.UpdateCacheType.ROOT_QUERY_ENTITIES, dbEntity, entity, {});
        if (!originalRecord) {
            return entity;
        }
        for (var columnName in originalRecord) {
            var originalValue = originalRecord[columnName];
            var newValue = currentRecord[columnName];
            if (!this.utils.valuesEqual(originalValue, newValue)) {
                updateDiff[columnName] = newValue;
            }
        }
        for (var columnName in currentRecord) {
            if (updateDiff[columnName]) {
                continue;
            }
            updateDiff[columnName] = entity[columnName];
        }
        return updateDiff;
    };
    UpdateCache.prototype.getEntityCache = function (dbEntity) {
        var schemaCache = this.utils.ensureChildArray(this.updateCache, dbEntity.schemaVersion.schema.index);
        return this.utils.ensureChildMap(schemaCache, dbEntity.index);
    };
    UpdateCache.prototype.saveToUpdateCacheInternal = function (cacheForUpdate, dbEntity) {
        var entities = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            entities[_i - 2] = arguments[_i];
        }
        for (var _a = 0, entities_2 = entities; _a < entities_2.length; _a++) {
            var entity = entities_2[_a];
            var compositeIdValue = this.utils.Schema.getIdKey(entity, dbEntity);
            // If no id is provided for an entity, it cannot be cached
            if (!compositeIdValue) {
                throw "Cannot cache entities with no ids";
            }
            var entityCache = this.getEntityCache(dbEntity);
            var entityCopy = entityCache[compositeIdValue];
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
    };
    UpdateCache.prototype.getEntityCacheEntry = function (cacheForUpdate, dbEntity, entity, entityCopy) {
        var _this = this;
        var _loop_2 = function (dbProperty) {
            var value = entity[dbProperty.name];
            if (this_2.utils.Schema.isEmpty(value)) {
                return "continue";
            }
            if (dbProperty.relation) {
                var dbRelation_1 = dbProperty.relation[0];
                switch (dbRelation_1.relationType) {
                    case ground_control_1.EntityRelationType.ONE_TO_MANY:
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.ALL_QUERY_ENTITIES) {
                            return "continue";
                        }
                        if (!(value instanceof Array)) {
                            throw "Expecting @OneToMany for an array entity relation";
                        }
                        value.forEach(function (manyObject) {
                            _this.saveToUpdateCacheInternal(cacheForUpdate, dbRelation_1.relationEntity, manyObject);
                        });
                        break;
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        if (!(value instanceof Object) || value instanceof Array) {
                            throw "Expecting @ManyToOne for a non-array entity relation";
                        }
                        this_2.utils.Schema.forEachColumnOfRelation(dbRelation_1, entity, function (dbColumn, value, propertyNameChains) {
                            _this.copyColumn(dbColumn, entityCopy, value);
                        }, false);
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.ALL_QUERY_ENTITIES) {
                            return "continue";
                        }
                        this_2.saveToUpdateCacheInternal(cacheForUpdate, dbRelation_1.relationEntity, value);
                        break;
                    default:
                        throw "Unknown relation type: " + dbRelation_1.relationType;
                }
            }
            else {
                var dbColumn = dbProperty.propertyColumns[0].column;
                this_2.copyColumn(dbColumn, entityCopy, value);
            }
        };
        var this_2 = this;
        for (var _i = 0, _a = dbEntity.properties; _i < _a.length; _i++) {
            var dbProperty = _a[_i];
            _loop_2(dbProperty);
        }
        return entityCopy;
    };
    UpdateCache.prototype.copyColumn = function (dbColumn, entityCopy, value) {
        var columnName = dbColumn.name;
        var copiedValue = entityCopy[columnName];
        if (!this.utils.Schema.isEmpty(copiedValue)
            && this.utils.valuesEqual(copiedValue, value)) {
            throw "Values do not match for column '" + dbColumn.propertyColumns[0].property.entity.name + "." + dbColumn.name + "'";
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
                throw "Unknown SQLDataType: " + dbColumn.type;
        }
    };
    UpdateCache.prototype.getUpdateCache = function (dbEntity, id) {
        var entityCache = this.getEntityCache(dbEntity);
        if (this.utils.Schema.isIdEmpty(id)) {
            return null;
        }
        return entityCache[id];
    };
    return UpdateCache;
}());
exports.UpdateCache = UpdateCache;
di_1.DI.set(diTokens_1.UPDATE_CACHE, UpdateCache);
