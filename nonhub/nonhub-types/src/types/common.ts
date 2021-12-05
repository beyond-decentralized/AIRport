export type RepositoryId = string
export type SinceTime = number
export type SearchResults = string
export type TransactionLogs = string
export type UserResponse = string
export type BatchUuid = string

export interface IReadRequest {
    repositoryUuId: string
    transactionLogEntryTime: number
}

export type ReadReply = string

export interface IWriteRequest {
    repositoryUuId: string
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
    userName: string
}
