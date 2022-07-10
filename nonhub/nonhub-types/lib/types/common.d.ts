export declare type RepositoryId = string;
export declare type SinceTime = number;
export declare type SearchResults = string;
export declare type TransactionLogs = string;
export declare type UserResponse = string;
export declare type BatchUuid = string;
export interface IReadRequest {
    repositoryGUID: string;
    transactionLogEntryTime: number;
}
export declare type ReadReply = string;
export interface IWriteRequest {
    repositoryGUID: string;
    data: string;
}
export interface IWriteReply {
    transactionLogEntryTime: number;
}
export interface SearchRequest {
    searchTerm: string;
}
export interface UserRequest {
    birthMonth: number;
    countryId: number;
    email: string;
    username: string;
}
//# sourceMappingURL=common.d.ts.map