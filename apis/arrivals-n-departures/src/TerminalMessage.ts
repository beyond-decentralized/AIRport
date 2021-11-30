import {
	IActor,
	IRepository,
	RepositoryTransactionHistory
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
	history: RepositoryTransactionHistory
	// TODO: Replace current SyncInRepositoryChecker logic with check for referencedRepositories
	referencedRepositories: IRepository[]
	syncTimestamp: number
	users: IUser[]
	terminals: ITerminal[]
}
