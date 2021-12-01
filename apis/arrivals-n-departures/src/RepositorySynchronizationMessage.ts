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
	syncTimestamp: number
	users: IUser[]
	terminals: ITerminal[]
}
