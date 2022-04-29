import { ISerializationStateManager } from './SerializationStateManager';
/**
 * A simple operation serializer. Ids are assumed to always
 * be represented by the "id" property.
 */
export interface IOperationSerializer {
    serializeAsArray<E>(entity: E | E[]): E[];
    serialize<E>(entity: E | E[]): E | E[];
}
interface ISerializableOperation {
    namePath: string[];
    processedEntityMap: Map<any, number>;
    sequence: number;
    stubLookupTable: any[];
}
export declare class OperationSerializer implements IOperationSerializer {
    serializationStateManager: ISerializationStateManager;
    serializeAsArray<E>(entity: E | E[]): E[];
    serialize<E>(entity: E | E[]): E | E[];
    doSerialize<T>(entity: T, operation: ISerializableOperation): T;
}
export {};
//# sourceMappingURL=OperationSerializer.d.ts.map