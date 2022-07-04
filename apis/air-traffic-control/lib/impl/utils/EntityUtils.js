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
import { Y } from '../../lingo/query/facade/Query';
import { ACTOR_PROPERTY_NAME, REPOSITORY_PROPERTY_NAME } from '../..';
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
    ensureId(rawEntityQuery) {
        let theRawEntityQuery = this.getRawQuery(rawEntityQuery);
        this.ensureIdAtLevel(theRawEntityQuery.select, theRawEntityQuery.from[0]);
        return theRawEntityQuery;
    }
    ensureIdAtLevel(selectClauseFragment, qEntity) {
        for (const propertyName in selectClauseFragment) {
            const subFragment = selectClauseFragment[propertyName];
            if (subFragment instanceof Object
                && typeof subFragment.airportSelectField !== 'boolean'
                && !subFragment.__allFields__) {
                let matchingQEntity;
                for (const childQEntity of qEntity.__driver__.childQEntities) {
                    if (childQEntity.__driver__.dbRelation.property.name === propertyName) {
                        matchingQEntity = childQEntity;
                        break;
                    }
                }
                if (matchingQEntity) {
                    this.ensureIdAtLevel(subFragment, matchingQEntity);
                }
            }
        }
        if (!selectClauseFragment.id) {
            return;
        }
        let repository = selectClauseFragment.repository;
        if (repository) {
            if (!(repository instanceof Object)) {
                throw new Error(`id queries must include a repository object in the select clause.
It must be an Object with the id property.`);
            }
            repository.GUID = Y;
        }
        let actor = selectClauseFragment.actor;
        if (actor) {
            if (!(actor instanceof Object)) {
                throw new Error(`id queries must include an actor object in the select clause.
It must be an Object with the id property.`);
            }
            actor.GUID = Y;
        }
        selectClauseFragment._actorRecordId = Y;
        this.ensureRepositoryAndActorJoin(qEntity);
    }
    ensureRepositoryAndActorJoin(qEntity) {
        let qActor, qRepository;
        let repositoryJoinFound = false;
        let actorJoinFound = false;
        for (const childQEntity of qEntity.__driver__.childQEntities) {
            if (childQEntity.__driver__.dbRelation.property.name === ACTOR_PROPERTY_NAME) {
                actorJoinFound = true;
                qActor = childQEntity;
            }
            if (childQEntity.__driver__.dbRelation.property.name === REPOSITORY_PROPERTY_NAME) {
                repositoryJoinFound = true;
                qRepository = childQEntity;
            }
        }
        if (!actorJoinFound) {
            qActor = qEntity.actor.leftJoin();
        }
        if (!repositoryJoinFound) {
            qRepository = qEntity.repository.leftJoin();
        }
        return {
            qActor,
            qRepository
        };
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