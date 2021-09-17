export declare enum SerializationState {
    DATE = "DATE",
    STUB = "STUB"
}
export interface ISerializedDate {
    __serializationState__: SerializationState.DATE;
    value: string;
}
export interface ISerializationStateManager {
    getSerializationUniqueId<T>(entity: T, throwIfNotFound?: boolean): number;
    getEntityState<T>(entity: T): SerializationState;
    markAsStub<T>(entity: T): void;
    isStub<T>(entity: T): boolean;
    serializeAsDate(value: Date): ISerializedDate;
    isDate<T>(entity: T): boolean;
    getUniqueIdFieldName(): string;
}
export declare class SerializationStateManager implements ISerializationStateManager {
    static SERIALIZATION_UNIQUE_ID_FIELD: string;
    static SERIALIZATION_STATE_FIELD: string;
    getSerializationUniqueId<T>(entity: T, throwIfNotFound?: boolean): number;
    getEntityState<T>(entity: T): SerializationState;
    markAsStub<T>(entity: T): void;
    isStub<T>(entity: T): boolean;
    serializeAsDate(value: Date): ISerializedDate;
    isDate<T>(entity: T): boolean;
    getUniqueIdFieldName(): string;
    private is;
    private markAs;
}
//# sourceMappingURL=SerializationStateManager.d.ts.map