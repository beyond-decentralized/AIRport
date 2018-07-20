import {
	IActor,
	IRepository,
	IRepositoryTransactionHistory,
	ITerminal,
	IUser
}                from "@airport/holding-pattern";
import {ISchema} from "@airport/traffic-pattern";

export interface RepositoryTransactionBlockData {
	users: IUser[];
	terminal: ITerminal;
	actors: IActor[];
	referencedRepositories: IRepository[];
	repository: IRepository;
	repoTransHistories: IRepositoryTransactionHistory[];
	schemas: ISchema[];
}