import { ISerializationStateManager } from './SerializationStateManager';
/**
 * A simple operation serializer that is not aware
 * of the schema and only supports create operations
 * (good enough for now, to be expanded on later).
 * Also, ids are currently assumed to always
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