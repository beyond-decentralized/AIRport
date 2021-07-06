import { IEntityStateManager } from './EntityStateManager';
/**
 * A simple operation serializer that is not aware
 * of the schema and only supports create operations
 * (good enough for now, to be expanded on later).
 * Also, ids are currently assumed to always
 * be represented by the "id" property.
 */
export interface IOperationSerializer {
    serialize<E, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): T;
}
interface ISerializableOperation {
    lookupTable: any[];
    sequence: number;
    stubLookupTable: any[];
}
export declare class OperationSerializer implements IOperationSerializer {
    serialize<E, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): T;
    doSerialize<E>(entity: E, operation: ISerializableOperation, entityStateManager: IEntityStateManager): E;
}
export {};
//# sourceMappingURL=OperationSerializer.d.ts.map