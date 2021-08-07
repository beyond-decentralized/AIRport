import { DI } from "@airport/di";
import { SERIALIZATION_STATE_MANAGER } from "./tokens";

export interface ISerializationStateManager {

}

export class SerializationStateManager
    implements ISerializationStateManager {

    static SERIALIZATION_UNIQUE_ID_FIELD = '__SUID__'

    getOperationUniqueId<T>(
        entity: T,
        throwIfNotFound = true,
        dbEntity: DbEntity = null
    ): number {
        const operationUniqueId = entity[SerializationStateManager.OPERATION_UNIQUE_ID_FIELD]

        if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
            if (throwIfNotFound) {
                let entityDescription
                if (dbEntity) {
                    entityDescription = dbEntity.schemaVersion.schema.name + '.' + dbEntity.name
                } else {
                    entityDescription = JSON.stringify(entity)
                }
                throw new Error(`Could not find "${SerializationStateManager.OPERATION_UNIQUE_ID_FIELD}" property on DTO:
        
        ${entityDescription}`)
            }
        }
        return operationUniqueId
    }

    markAsStub<T>(
        entity: T
    ): void {
        (<EntityWithState><any>entity).__state__ = EntityState.STUB
    }


    getUniqueIdFieldName(): string {
        return EntityStateManager.OPERATION_UNIQUE_ID_FIELD
    }

}
DI.set(SERIALIZATION_STATE_MANAGER, SerializationStateManager)


