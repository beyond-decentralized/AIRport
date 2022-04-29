import { ISerializationStateManager } from './SerializationStateManager';
/**
 * Deserializer for query results coming back from the server
 */
export interface IQueryResultsDeserializer {
    deserialize<E, T = E | E[]>(entity: T): T;
}
interface IDeserializableOperation {
    lookupTable: any[];
}
export declare class QueryResultsDeserializer implements IQueryResultsDeserializer {
    serializationStateManager: ISerializationStateManager;
    deserialize<E, T = E | E[]>(entity: T): T;
    doDeserialize<E>(entity: E, operation: IDeserializableOperation): E;
}
export {};
//# sourceMappingURL=QueryResultsDeserializer.d.ts.map