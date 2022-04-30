var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
let EntityCopier = class EntityCopier {
    copyEntityForProcessing(entity, dbEntity, entityStateManager, context) {
        const operation = {
            processedEntityMap: new Map(),
            sequence: context.lastOUID ? context.lastOUID : 0,
        };
        const copy = this.doCopyEntityForProcessing(entity, dbEntity, entityStateManager, operation);
        context.lastOUID = operation.sequence;
        return copy;
    }
    doCopyEntityForProcessing(entity, dbEntity, entityStateManager, operation) {
        if (entity instanceof Array) {
            return entity.map(anEntity => this.doCopyEntityForProcessing(anEntity, dbEntity, entityStateManager, operation));
        }
        else {
            let entityCopy = {};
            if (operation.processedEntityMap.has(entity)) {
                return operation.processedEntityMap.get(entity);
            }
            operation.processedEntityMap.set(entity, entityCopy);
            const operationUniqueId = ++operation.sequence;
            entityCopy[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
            entity[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
            entityStateManager.setOriginalValues(entityStateManager.getOriginalValues(entity), entityCopy);
            for (let dbProperty of dbEntity.properties) {
                const property = entity[dbProperty.name];
                if (dbProperty.relation && dbProperty.relation.length && property) {
                    entityCopy[dbProperty.name] = this.doCopyEntityForProcessing(property, dbProperty.relation[0].relationEntity, entityStateManager, operation);
                }
                else {
                    // No need to clone dates or JSON objects - they
                    // won't be modified by the save process
                    entityCopy[dbProperty.name] = property;
                }
            }
            entityCopy[entityStateManager.getStateFieldName()]
                = entity[entityStateManager.getStateFieldName()];
            return entityCopy;
        }
    }
};
EntityCopier = __decorate([
    Injected()
], EntityCopier);
export { EntityCopier };
//# sourceMappingURL=EntityCopier.js.map