export type RepositoryId = string
export type SinceTime = number
export type SearchResults = string
export type TransactionLogs = string
export type UserResponse = string
export type BatchUuid = string

export enum ServerState {
    RUNNING = 'RUNNING',
    SHUTTING_DOWN_REQUESTS = 'SHUTTING_DOWN_REQUESTS',
    SHUTTING_DOWN_SERVER = 'SHUTTING_DOWN_SERVER',
}

export enum ServerError {
    DATABASE = 'DATABASE',
    INVALID = 'INVALID',
    SHUTDOWN = 'SHUTDOWN'
}

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
