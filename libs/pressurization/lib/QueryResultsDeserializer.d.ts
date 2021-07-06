import { IEntityStateManager } from './EntityStateManager';
/**
 * Deserializer for query results coming back from the server
 */
export interface IQueryResultsDeserializer {
    deserialize<E, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): T;
}
interface IDeserializableOperation {
    lookupTable: any[];
}
export declare class QueryResultsDeserializer implements IQueryResultsDeserializer {
    deserialize<E, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): T;
    doDeserialize<E>(entity: E, operation: IDeserializableOperation, entityStateManager: IEntityStateManager): E;
}
export {};
//# sourceMappingURL=QueryResultsDeserializer.d.ts.map