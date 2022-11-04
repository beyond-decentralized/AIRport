import { Injected } from "@airport/direction-indicator"

export enum SerializationState {
    DATE = 'DATE',
    STUB = 'STUB'
}

export interface ISerializedDate {
    __serializationState__: SerializationState.DATE
    value: string
}

export interface ISerializationStateManager {

    getSerializationUniqueId<T>(
        entity: T,
        throwIfNotFound?: boolean
    ): number

    getEntityState<T>(
        entity: T
    ): SerializationState

    markAsStub<T>(
        entity: T
    ): void

    isStub<T>(
        entity: T
    ): boolean

    serializeAsDate(
        value: Date
    ): ISerializedDate

    isDate<T>(
        entity: T
    ): boolean

    getUniqueIdFieldName(): string

    // getStateFieldName(): string

}

@Injected()
export class SerializationStateManager
    implements ISerializationStateManager {

    static SERIALIZATION_UNIQUE_ID_FIELD = '__SUID__'
    static SERIALIZATION_STATE_FIELD = '__serializationState__'
    static ORIGINAL_VALUES_PROPERTY = '__originalValues__'

    getSerializationUniqueId<T>(
        entity: T,
        throwIfNotFound = true
    ): number {
        const serializationUniqueId = entity[SerializationStateManager.SERIALIZATION_UNIQUE_ID_FIELD]

        if (!serializationUniqueId || typeof serializationUniqueId !== 'number' || serializationUniqueId < 1) {
            if (throwIfNotFound) {
                throw new Error(`Could not find "${SerializationStateManager.SERIALIZATION_UNIQUE_ID_FIELD}" property on DTO:
        
        ${JSON.stringify(entity)}`)
            }
        }
        return serializationUniqueId
    }

    getEntityState<T>(
        entity: T
    ): SerializationState {
        return entity[SerializationStateManager.SERIALIZATION_STATE_FIELD]
    }

    markAsStub<T>(
        entity: T
    ): void {
        this.markAs(entity, SerializationState.STUB);
    }

    isStub<T>(
        entity: T
    ): boolean {
        return this.is(entity, SerializationState.STUB)
    }

    serializeAsDate(
        value: Date
    ): ISerializedDate {
        return {
            __serializationState__: SerializationState.DATE,
            value: value.toISOString()
        }
    }

    isDate<T>(
        entity: T
    ): boolean {
        return this.is(entity, SerializationState.DATE)
    }

    getUniqueIdFieldName(): string {
        return SerializationStateManager.SERIALIZATION_UNIQUE_ID_FIELD
    }

    // getStateFieldName(): string {
    //     return SerializationStateManager.SERIALIZATION_STATE_FIELD
    // }

    private is<T>(
        entity: T,
        serializationState: SerializationState
    ): boolean {
        return entity[SerializationStateManager.SERIALIZATION_STATE_FIELD] == serializationState
    }

    private markAs<T>(
        entity: T,
        serializationState: SerializationState
    ): void {
        entity[SerializationStateManager.SERIALIZATION_STATE_FIELD] = serializationState
    }

}
