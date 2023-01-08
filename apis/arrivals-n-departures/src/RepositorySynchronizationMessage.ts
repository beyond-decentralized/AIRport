import {
	IActor,
	IRepository,
	IRepositoryTransactionHistory
} from "@airport/holding-pattern/dist/app/bundle";
import type {
	ITerminal,
	IUserAccount
} from "@airport/travel-document-checkpoint/dist/app/bundle";
import {
	IApplication,
	IApplicationRelation,
	IApplicationVersion
} from "@airport/airspace";

export type ReferencedApplicationVersion_InMessageIndex = number
export type ReferencedApplicationRelation_InMessageIndex = number
export type ReferencedRepository_InMessageIndex = number


export interface RepositorySynchronizationMessage {
	actors: IActor[]
	applications: IApplication[]
	applicationVersions: IApplicationVersion[]
	history: IRepositoryTransactionHistory
	// Repositories may reference records in other repositories
	referencedApplicationRelations: IApplicationRelation[]
	referencedApplicationVersions: IApplicationVersion[]
	referencedRepositories: IRepository[]
	syncTimestamp?: number
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
