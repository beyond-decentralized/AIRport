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
	ISchema,
	ISchemaVersion
} from "@airport/airspace";

export interface TerminalMessage {
	actors: IActor[]
	schemaVersions: ISchemaVersion[]
	schemas: ISchema[]
	history: IRepositoryTransactionHistory
	// Repositories may reference records in other repositories
	referencedRepositories: IRepository[]
	syncTimestamp: number
	users: IUser[]
	terminals: ITerminal[]
}
