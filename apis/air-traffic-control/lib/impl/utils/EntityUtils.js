var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { QOperableField } from '../core/field/OperableField';
import { EntityQuery } from '../query/facade/EntityQuery';
import { TreeQuery } from '../query/facade/TreeQuery';
import { QTree, QTreeDriver } from '../core/entity/Tree';
import { QEntity } from '../core/entity/Entity';
import { QField } from '../core/field/Field';
import { ENTITY_UTILS } from '../../core-tokens';
/**
 * Created by Papa on 6/14/2016.
 */
let EntityUtils = class EntityUtils {
    getObjectClassName(object) {
        if (typeof object != 'object' || object === null) {
            throw new Error(`Not an object instance`);
        }
        return this.getClassName(object.constructor);
    }
    getClassName(clazz) {
        if (typeof clazz != 'function') {
            throw new Error(`Not a constructor function`);
        }
        let className = clazz['name'];
        // let className = /(\w+)\(/.exec(clazz.toString())[1];
        return className;
    }
    exists(object) {
        return this.utils.objectExists(object);
    }
    /*
     static isBlank(
     object: any
     ) {
     for (let propertyName in object) {
     let property = object[propertyName];
     if (this.exists(property)) {
     if (property instanceof Array) {
     if (property.length > 0) {
     return false;
     }
     } else {
     return false;
     }
     }
     }
     return true;
     }
     */
    isAppliable(object) {
        return object instanceof QOperableField;
    }
    getQuery(query) {
        return this.getRawQuery(query);
    }
    ensureUuid(rawEntityQuery, dbEntity) {
        let theRawEntityQuery = this.getRawQuery(rawEntityQuery);
        this.ensureUuIdAtLevel(theRawEntityQuery.select, dbEntity, theRawEntityQuery.from[0], rawEntityQuery);
        return theRawEntityQuery;
    }
    ensureUuIdAtLevel(selectClauseFragment, dbEntity, qEntity, rawGraphQuery) {
        if (selectClauseFragment.uuId) {
            qEntity.__driver__.parentJoinEntity;
        }
        console.log('qEntity: ' + qEntity);
    }
    findRepositoryQEntity() {
    }
    findActorQEntity() {
    }
    // Removes circular dependency at code initialization time
    getRawQuery(rawQuery) {
        if (rawQuery instanceof Function) {
            return rawQuery();
        }
        else {
            return rawQuery;
        }
    }
    // Removes circular dependency at code initialization time
    getEntityQuery(rawGraphQuery) {
        return new EntityQuery(this.getRawQuery(rawGraphQuery));
    }
    // Removes circular dependency at code initialization time
    getTreeQuery(rawQuery, entityAliases) {
        return new TreeQuery(rawQuery, entityAliases);
    }
    // Removes circular dependency at code initialization time
    isQEntity(qEntity) {
        return qEntity instanceof QEntity;
    }
    // Removes circular dependency at code initialization time
    isQTree(qEntity) {
        return qEntity instanceof QTreeDriver;
    }
    // Removes circular dependency at code initialization time
    getQTree(fromClausePosition, subQuery) {
        return new QTree(fromClausePosition, subQuery);
    }
    // Removes circular dependency at code initialization time
    isQField(qEntity) {
        return qEntity instanceof QField;
    }
};
__decorate([
    Inject()
], EntityUtils.prototype, "utils", void 0);
EntityUtils = __decorate([
    Injected()
], EntityUtils);
export { EntityUtils };
ENTITY_UTILS.setClass(EntityUtils);
//# sourceMappingURL=EntityUtils.js.map