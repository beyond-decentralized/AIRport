import {
	IActor,
	IRepository,
	IRepositoryTransactionHistory
}                from "@airport/holding-pattern";
import {IDomain} from "@airport/territory";
import {
	ISchema,
	ISchemaVersion
}                from "@airport/traffic-pattern";
import {
	ITerminal,
	IUser
}                from '@airport/travel-document-checkpoint'

export interface RepositoryTransactionBlockData {
	actors: IActor[];
	// Domains can be referenced in multiple schemas of RTB
	domains: IDomain[];
	referencedRepositories: IRepository[];
	repository: IRepository;
	repoTransHistories: IRepositoryTransactionHistory[];
	/*
	 A given Repository Transaction Block can have multiple versions of any involved schema.
	 This is because it may contain RTHs across any number of schema upgrades (over any
	 period of time).

	 Hence schemas can be referenced in multiple schema versions
	  */
	schemas: ISchema[];
	schemaVersions: ISchemaVersion[];
	terminal: ITerminal;
	users: IUser[];
}