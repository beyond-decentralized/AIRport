/**
 * Save results are needed to update application/schema isolates:
 *     - created objects with new ids
 *     - trim deleted objects
 *     - notify the client if an expected update did not take place
 *
 * For that reason there must be a way to traverse the original
 * tree of saved objects and make modifications to them.  A
 * natural fit for that is to use operationUniqueIds that are
 * generated for each object passed into the save commands.
 */
export interface ICreateResultRecords {
    [operationUniqueId: string]: {
        [propertyName: string]: number;
    } | boolean;
}
export interface IUpdateResultRecords {
    [operationUniqueId: string]: boolean;
}
export interface IDeleteResultRecords {
    [operationUniqueId: string]: boolean;
}
export interface ISaveResult {
    created: ICreateResultRecords;
    updated: IUpdateResultRecords;
    deleted: IDeleteResultRecords;
}
//# sourceMappingURL=SaveResult.d.ts.map