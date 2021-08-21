import { DI } from "@airport/di";
import { ENTITY_COPIER } from "../../tokens";
export class EntityCopier {
    copyEntityForProcessing(entity, dbEntity, entityStateManager) {
        const operation = {
            processedEntitySet: new Set(),
            sequence: 0,
        };
        return this.doCopyEntityForProcessing(entity, dbEntity, entityStateManager, operation);
    }
    doCopyEntityForProcessing(entity, dbEntity, entityStateManager, operation) {
        if (entity instanceof Array) {
            return entity.map(anEntity => this.doCopyEntityForProcessing(anEntity, dbEntity, entityStateManager, operation));
        }
        else {
            let entityCopy = {};
            if (operation.processedEntitySet.has(entity)) {
                return;
            }
            operation.processedEntitySet.add(entity);
            const operationUniqueId = ++operation.sequence;
            entityCopy[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
            entity[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
            for (let dbProperty of dbEntity.properties) {
                const property = entity[dbProperty.name];
                if (dbProperty.relation && dbProperty.relation.length) {
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
}
DI.set(ENTITY_COPIER, EntityCopier);
//# sourceMappingURL=EntityCopier.js.map