import { DI } from "@airport/di"
import { 
    DbEntity,
    IEntityStateManager
} from "@airport/ground-control"
import { ENTITY_COPIER } from "../../tokens"

interface ICopyOperation {
    processedEntityMap: Map<any, any>
    sequence: number
}

/**
 * A defensive copy maker.  It's a fast operation but might
 * save headaches going forward.  The only currently known scenario
 * where it is useful is related to not propagating the stateField
 * used for save operation.  This could be important if
 * a save operation fails and, subsequently, the invoking logic
 * further modifies objects (resulting in a state where previously
 * a non-op object becomes an update or an update becomes a delete).
 */
export interface IEntityCopier {

    copyEntityForProcessing<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
    ): T

}

export class EntityCopier
    implements IEntityCopier {

    copyEntityForProcessing<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
    ): T {
        const operation: ICopyOperation = {
            processedEntityMap: new Map(),
            sequence: 0,
        }

        return this.doCopyEntityForProcessing(entity, dbEntity,
            entityStateManager, operation)
    }

    private doCopyEntityForProcessing<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
        operation: ICopyOperation
    ): T {
        if (entity instanceof Array) {
            return entity.map(anEntity => this.doCopyEntityForProcessing(
                anEntity, dbEntity, entityStateManager, operation)) as any
        } else {
            let entityCopy: any = {}

            if (operation.processedEntityMap.has(entity)) {
                return operation.processedEntityMap.get(entity)
            }
            operation.processedEntityMap.set(entity, entityCopy)

            const operationUniqueId = ++operation.sequence
            entityCopy[entityStateManager.getUniqueIdFieldName()] = operationUniqueId
            entity[entityStateManager.getUniqueIdFieldName()] = operationUniqueId

            for (let dbProperty of dbEntity.properties) {
                const property = entity[dbProperty.name]
                if (dbProperty.relation && dbProperty.relation.length && property) {
                    entityCopy[dbProperty.name] = this.doCopyEntityForProcessing(
                        property, dbProperty.relation[0].relationEntity,
                        entityStateManager, operation)
                } else {
                    // No need to clone dates or JSON objects - they
                    // won't be modified by the save process
                    entityCopy[dbProperty.name] = property
                }
            }
            entityCopy[entityStateManager.getStateFieldName()]
                = entity[entityStateManager.getStateFieldName()]

            return entityCopy
        }
    }
}
DI.set(ENTITY_COPIER, EntityCopier)
