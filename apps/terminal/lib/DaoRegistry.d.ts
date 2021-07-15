import { DbEntity, PortableQuery } from "@airport/ground-control";
export interface IDaoRegistry {
    findOperation(daoName: string, methodName: string): IDaoOperation;
}
export declare enum DaoOperationType {
    ADD_REPOSITORY = 0,
    FIND = 1,
    FIND_ONE = 2,
    SAVE = 3,
    SEARCH = 4,
    SEARCH_ONE = 5
}
export interface IDaoOperation {
    dbEntity: DbEntity;
    queryReference: IQueryReference;
    type: DaoOperationType;
}
export interface IQueryReference {
    portableQuery: PortableQuery;
    parameterAliasesByPosition: string[];
}
export declare class DaoRegistry {
    findOperation(daoName: string, methodName: string): IDaoOperation;
}
//# sourceMappingURL=DaoRegistry.d.ts.map