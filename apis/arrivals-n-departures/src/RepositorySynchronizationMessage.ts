import { DbApplication, DbApplicationVersion, DbRelation, IActor, IRepository, IRepositoryMember, IRepositoryTransactionHistory, ITerminal, IUserAccount } from "@airport/ground-control";

export type ReferencedApplicationVersion_InMessageIndex = number
export type ReferencedApplicationRelation_InMessageIndex = number
export type ReferencedRepository_InMessageIndex = number

export type RepositorySynchronizationMessage_Signature = string

export interface RepositorySynchronizationMessage {
	data: RepositorySynchronizationData
	signature?: RepositorySynchronizationMessage_Signature
	syncTimestamp?: number
}

export interface RepositorySynchronizationData {
	actors: IActor[]
	applications: DbApplication[]
	applicationVersions: DbApplicationVersion[]
	history: IRepositoryTransactionHistory
	memberOperations: IRepositoryMember[]
	// Repositories may reference records in other repositories
	referencedApplicationRelations: DbRelation[]
	referencedApplicationVersions: DbApplicationVersion[]
	referencedRepositories: IRepository[]
	terminals: ITerminal[]
	userAccounts: IUserAccount[]
}

export interface RepositorySynchronizationWriteRequest {
	messages: RepositorySynchronizationMessage[]
	repositoryGUID: string
}

export interface RepositorySynchronizationWriteResponse {
	error?: string
	syncTimestamp: number
}

export interface RepositorySynchronizationReadRequest {
	repositoryGUID: string
	syncTimestamp?: number
}

export interface RepositorySynchronizationReadResponse {
	error?: string
	fragments: RepositorySynchronizationReadResponseFragment[]
}

export interface RepositorySynchronizationReadResponseFragment {
	messages: RepositorySynchronizationMessage[]
	repositoryGUID: string
	syncTimestamp: number
}
