export type RepositoryId = string
export type SinceTime = number
export type SearchResults = string
export type TransactionLogs = string
export type UserResponse = string
export type BatchUuid = string

export interface IReadRequest {
    repositoryGUID: string
    transactionLogEntryTime: number
}

export type ReadReply = string

export interface IWriteRequest {
    repositoryGUID: string
    data: string
}

export interface IWriteReply {
    transactionLogEntryTime: number
}

export interface SearchRequest {
    searchTerm: string
}

export interface UserRequest {
    birthMonth: number
    countryId: number
    email: string
    username: string
}
