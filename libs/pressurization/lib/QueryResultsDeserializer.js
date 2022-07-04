var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AIR_ENTITY_UTILS } from '@airport/aviation-communication';
import { Inject, Injected } from '@airport/direction-indicator';
import { SerializationState } from './SerializationStateManager';
let QueryResultsDeserializer = class QueryResultsDeserializer {
    deserialize(entity) {
        const operation = {
            lookupTable: [],
        };
        let deserializedEntity;
        if (entity instanceof Array) {
            deserializedEntity = entity.map(anEntity => this.doDeserialize(anEntity, operation));
        }
        else {
            deserializedEntity = this.doDeserialize(entity, operation);
        }
        return deserializedEntity;
    }
    doDeserialize(entity, operation) {
        let state = this.serializationStateManager.getEntityState(entity);
        switch (state) {
            case SerializationState.DATE:
                return new Date(entity['value']);
            // case EntityState.RESULT_JSON:
            // 	return entity
            // case EntityState.RESULT_JSON_ARRAY:
            // 	const value = entity['value']
            // 	value[entityStateManager.getStateFieldName()] = EntityState.RESULT_JSON_ARRAY
            // 	return entity
        }
        let operationUniqueId = this.serializationStateManager.getSerializationUniqueId(entity);
        if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
            throw new Error(`Invalid or missing ${this.serializationStateManager.getUniqueIdFieldName()} field.`);
        }
        let alreadyDeserializedEntity = operation.lookupTable[operationUniqueId];
        switch (state) {
            case SerializationState.STUB: {
                if (!alreadyDeserializedEntity) {
                    throw new Error(`Could not find an already present entity for
					${this.serializationStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`);
                }
                return alreadyDeserializedEntity;
            }
            default:
                if (alreadyDeserializedEntity) {
                    throw new Error(`Entity appears more than once for
					${this.serializationStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`);
                }
        }
        let deserializedEntity = {};
        operation.lookupTable[operationUniqueId] = deserializedEntity;
        for (const propertyName in entity) {
            const property = entity[propertyName];
            let propertyCopy;
            if (property instanceof Object) {
                if (property instanceof Array) {
                    propertyCopy = property.map(aProperty => this.doDeserialize(aProperty, operation));
                }
                else {
                    propertyCopy = this.doDeserialize(property, operation);
                }
            }
            else {
                propertyCopy = property;
            }
            deserializedEntity[propertyName] = propertyCopy;
        }
        delete deserializedEntity[this.serializationStateManager.getUniqueIdFieldName()];
        return deserializedEntity;
    }
    deepCopyProperties(from, to) {
        if (from instanceof Array) {
            for (let i = 0; i < from.length; i++) {
                this.deepCopyProperties(from[i], to[i]);
            }
        }
        if (!(from instanceof Object)) {
            return;
        }
        if (from instanceof Date) {
            return;
        }
        for (let propertyName in from) {
            if (!from.hasOwnProperty(propertyName)) {
                continue;
            }
            let fromProperty = from[propertyName];
            let toProperty = to[propertyName];
            if (fromProperty instanceof Object && toProperty instanceof Object) {
                this.deepCopyProperties(fromProperty, toProperty);
            }
            else {
                to[propertyName] = from[propertyName];
            }
        }
        for (let propertyName in to) {
            if (!to.hasOwnProperty(propertyName)) {
                continue;
            }
            if (!from.hasOwnProperty(propertyName)) {
                delete to[propertyName];
            }
        }
        this.doSetPropertyDescriptors(to);
    }
    setPropertyDescriptors(object) {
        if (object instanceof Array) {
            for (let i = 0; i < object.length; i++) {
                this.setPropertyDescriptors(object[i]);
            }
        }
        if (!(object instanceof Object)) {
            return;
        }
        if (object instanceof Date) {
            return;
        }
        for (let propertyName in object) {
            if (!object.hasOwnProperty(propertyName)) {
                continue;
            }
            let property = object[propertyName];
            if (property instanceof Object) {
                this.setPropertyDescriptors(property);
            }
        }
        this.doSetPropertyDescriptors(object);
    }
    doSetPropertyDescriptors(object) {
        let objectPrototype = Object.getPrototypeOf(object);
        if (!object.id
            && !Object.getOwnPropertyDescriptor(object, 'id')
            && (!objectPrototype
                || !Object.getOwnPropertyDescriptor(objectPrototype, 'id'))) {
            Object.defineProperty(object, 'id', {
                get() {
                    return this.__container__.getSync(AIR_ENTITY_UTILS).encodeId(this);
                },
                set(idString) {
                    return this.__container__.getSync(AIR_ENTITY_UTILS).setId(idString, this);
                }
            });
        }
        if (!object.isNew
            && !Object.getOwnPropertyDescriptor(object, 'isNew')
            && (!objectPrototype
                || !Object.getOwnPropertyDescriptor(objectPrototype, 'isNew'))) {
            Object.defineProperty(object, 'isNew', {
                get() {
                    return !!this._actorRecordId;
                }
            });
        }
        if (!object.isNew
            && !Object.getOwnPropertyDescriptor(object, 'createdBy')
            && (!objectPrototype
                || !Object.getOwnPropertyDescriptor(objectPrototype, 'createdBy'))) {
            Object.defineProperty(object, 'createdBy', {
                get() {
                    return this.actor.user.username;
                }
            });
        }
    }
};
__decorate([
    Inject()
], QueryResultsDeserializer.prototype, "serializationStateManager", void 0);
QueryResultsDeserializer = __decorate([
    Injected()
], QueryResultsDeserializer);
export { QueryResultsDeserializer };
//# sourceMappingURL=QueryResultsDeserializer.js.map