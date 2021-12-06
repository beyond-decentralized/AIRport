import {
	IActor,
	IRepository,
	IRepositoryTransactionHistory
} from "@airport/holding-pattern";
import {
	ITerminal,
	IUser
} from "@airport/travel-document-checkpoint";
import {
	IApplication,
	IApplicationVersion
} from "@airport/airspace";

export interface RepositorySynchronizationMessage {
	actors: IActor[]
	applicationVersions: IApplicationVersion[]
	applications: IApplication[]
	history: IRepositoryTransactionHistory
	// Repositories may reference records in other repositories
	referencedRepositories: IRepository[]
	syncTimestamp?: number
	users: IUser[]
	terminals: ITerminal[]
}

export interface RepositorySynchronizationWriteRequest {
	messages: RepositorySynchronizationMessage[]
	repositoryUuId: string
}

export interface RepositorySynchronizationWriteResponse {
	error?: string
	syncTimestamp: number
}

export interface RepositorySynchronizationReadRequest {
	repositoryUuId: string
	syncTimestamp?: number
}

export interface RepositorySynchronizationReadResponse {
	error?: string
	fragments: RepositorySynchronizationReadResponseFragment[]
}

export interface RepositorySynchronizationReadResponseFragment {
	messages: RepositorySynchronizationMessage[]
	repositoryUuId: string
	syncTimestamp: number
}
