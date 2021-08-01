export interface ISaveResultRecords {
    // ID can be either operationUniqueId for remote operations
    // or the Id of the object for local operations (non-serialized)
    [id: string]: number
}

export interface ISaveResult {
    created: ISaveResultRecords
    updated: ISaveResultRecords
    deleted: ISaveResultRecords
}