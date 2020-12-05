/**
 * Deserializer for query results coming back from the server
 */
export interface IQueryResultsDeserializer {
    deserialize<E, T = E | E[]>(entity: T, isOperation: boolean): T;
}
export declare class QueryResultsDeserializer implements IQueryResultsDeserializer {
    deserialize<E, T = E | E[]>(entity: T): T;
}
//# sourceMappingURL=QueryResultsDeserializer.d.ts.map