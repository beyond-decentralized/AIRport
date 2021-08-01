export interface ISaveResultRecords {
    [operationUniqueId: string]: number;
}
export interface ISaveResult {
    created: ISaveResultRecords;
    updated: ISaveResultRecords;
    deleted: ISaveResultRecords;
}
//# sourceMappingURL=SaveResult.d.ts.map