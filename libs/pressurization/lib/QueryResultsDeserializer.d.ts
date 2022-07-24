import { IAirEntityUtils } from '@airport/aviation-communication';
import { ISerializationStateManager } from './SerializationStateManager';
/**
 * Deserializer for query results coming back from the server
 */
export interface IQueryResultsDeserializer {
    deserialize<E, T = E | E[]>(entity: T): T;
    deepCopyProperties<T>(from: T, to: T): void;
    setPropertyDescriptors(object: any): void;
}
interface IDeserializableOperation {
    lookupTable: any[];
}
export declare class QueryResultsDeserializer implements IQueryResultsDeserializer {
    airEntityUtils: IAirEntityUtils;
    serializationStateManager: ISerializationStateManager;
    deserialize<E, T = E | E[]>(entity: T): T;
    doDeserialize<E>(entity: E, operation: IDeserializableOperation): E;
    deepCopyProperties<T>(from: T, to: T): void;
    setPropertyDescriptors(object: any): void;
    private doSetPropertyDescriptors;
}
export {};
//# sourceMappingURL=QueryResultsDeserializer.d.ts.map