"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Papa on 10/18/2016.
 */
const ALIASES = ['a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'];
class AliasCache {
    constructor(aliasPrefix = '') {
        this.aliasPrefix = aliasPrefix;
        this.reset();
    }
    getFollowingAlias() {
        let currentAlias = this.lastAlias;
        for (var i = 2; i >= 0; i--) {
            let currentIndex = currentAlias[i];
            currentIndex = (currentIndex + 1) % 26;
            currentAlias[i] = currentIndex;
            if (currentIndex !== 0) {
                break;
            }
        }
        let aliasString = this.aliasPrefix;
        for (var i = 0; i < 3; i++) {
            aliasString += ALIASES[currentAlias[i]];
        }
        return aliasString;
    }
    reset() {
        this.lastAlias = [-1, -1, -1];
    }
}
exports.AliasCache = AliasCache;
class AliasMap {
    constructor(aliasCache) {
        this.aliasCache = aliasCache;
        this.aliasMap = new Map();
    }
    getNextAlias(object) {
        if (this.hasAliasFor(object)) {
            return this.getExistingAlias(object);
        }
        let aliasString = this.aliasCache.getFollowingAlias();
        this.aliasMap.set(object, aliasString);
        return aliasString;
    }
    hasAliasFor(object) {
        return this.aliasMap.has(object);
    }
}
exports.AliasMap = AliasMap;
class EntityAliases extends AliasMap {
    constructor(entityAliasCache = new AliasCache('E'), columnAliasCache = new AliasCache('C'), parameterAliasCache = new AliasCache('P')) {
        super(entityAliasCache);
        this.columnAliasCache = columnAliasCache;
        this.parameterAliases = new ParameterAliases(parameterAliasCache);
    }
    getParams( //
    ) {
        return this.parameterAliases;
    }
    getNewFieldColumnAliases() {
        return new FieldColumnAliases(this, this.columnAliasCache);
    }
    getExistingAlias(entity) {
        if (!this.hasAliasFor(entity)) {
            throw new Error(`No alias found for entity ${entity.__driver__.dbEntity.name}`);
        }
        return this.aliasMap.get(entity);
    }
    getOnlyAlias( //
    ) {
        if (this.aliasMap.size !== 1) {
            return `Expecting only 1 entry in Field's alias map`;
        }
        return this.aliasMap.get(this.aliasMap.keys().next().value);
    }
}
exports.EntityAliases = EntityAliases;
class ParameterAliases extends AliasMap {
    constructor(aliasCache) {
        super(aliasCache);
    }
    getNextAlias(object) {
        if (this.hasAliasFor(object)) {
            return this.getExistingAlias(object).alias;
        }
        let aliasString = this.aliasCache.getFollowingAlias();
        let parameter = {
            alias: aliasString,
            value: object.value
        };
        this.aliasMap.set(object, parameter);
        return aliasString;
    }
    getExistingAlias(field) {
        if (!this.hasAliasFor(field)) {
            throw new Error(`No alias found for a parameter`);
        }
        return this.aliasMap.get(field);
    }
    getParameters( //
    ) {
        let parameters = {};
        this.aliasMap.forEach((value, key) => {
            parameters[value.alias] = value;
        });
        return parameters;
    }
}
exports.ParameterAliases = ParameterAliases;
class FieldColumnAliases extends AliasMap {
    constructor(_entityAliases, aliasCache) {
        super(aliasCache);
        this._entityAliases = _entityAliases;
    }
    get entityAliases( //
    ) {
        return this._entityAliases;
    }
    getExistingAlias(field) {
        if (!this.hasAliasFor(field)) {
            const qField = field;
            throw new Error(`No alias found for property ${qField.dbProperty.entity.name}.${qField.dbProperty.name}`);
        }
        return this.aliasMap.get(field);
    }
}
exports.FieldColumnAliases = FieldColumnAliases;
//# sourceMappingURL=Aliases.js.map