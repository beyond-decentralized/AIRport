import {
	IActor,
	IRepository,
	IRepositoryTransactionHistory,
	ITerminal,
	IUser
} from "@airport/holding-pattern";
import {
	ISchema,
	ISchemaVersion
} from "@airport/traffic-pattern";

export interface RepositoryTransactionBlockData {
	users: IUser[];
	terminal: ITerminal;
	actors: IActor[];
	referencedRepositories: IRepository[];
	repository: IRepository;
	repoTransHistories: IRepositoryTransactionHistory[];
	/*
	 A given Repository Transaction Block will always be at a single
	 version of all involved schemas.  This is because it is committed on a Terminal
	 with a particular snapshot of schema versions.

	 Hence schema's come embedded in the schema version objects
	  */
	schemaVersions: ISchemaVersion[];
}