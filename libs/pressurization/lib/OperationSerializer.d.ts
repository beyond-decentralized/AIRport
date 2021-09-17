import { ISerializationStateManager } from './SerializationStateManager';
/**
 * A simple operation serializer. Ids are assumed to always
 * be represented by the "id" property.
 */
export interface IOperationSerializer {
    serialize<E, T = E | E[]>(entity: T, serializationStateManager: ISerializationStateManager): T;
}
interface ISerializableOperation {
    namePath: string[];
    processedEntityMap: Map<any, number>;
    sequence: number;
    stubLookupTable: any[];
}
export declare class OperationSerializer implements IOperationSerializer {
    serialize<E, T = E | E[]>(entity: T, serializationStateManager: ISerializationStateManager): T;
    doSerialize<E>(entity: E, operation: ISerializableOperation, serializationStateManager: ISerializationStateManager): E;
}
export {};
//# sourceMappingURL=OperationSerializer.d.ts.map