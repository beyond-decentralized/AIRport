import { IEntityStateManager } from '@airport/pressurization';
export interface IQueryResultsSerializer {
    serialize<E, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): T;
}
interface ISerializableOperation {
    lookupTable: any[];
    sequence: number;
    stubLookupTable: any[];
}
export declare class QueryResultsSerializer implements IQueryResultsSerializer {
    serialize<E, EntityCascadeGraph, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): T;
    doSerialize<E>(entity: E, operation: ISerializableOperation, entityStateManager: IEntityStateManager): E;
}
export {};
//# sourceMappingURL=QueryResultsSerializer.d.ts.map