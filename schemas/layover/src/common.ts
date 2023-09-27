import { IApplication, IApplicationVersion, IDomain, IActor, IRepository, IRepositoryTransactionHistory, ITerminal, IUserAccount } from "@airport/ground-control";

export interface RepositoryTransactionBlockData {
	actors: IActor[];
	// Domains can be referenced in multiple applications of RTB
	domains: IDomain[];
	referencedRepositories: IRepository[];
	repository: IRepository;
	repoTransHistories: IRepositoryTransactionHistory[];
	/*
	 A given Repository Transaction Block can have multiple versions of any involved application.
	 This is because it may contain RTHs across any number of application upgrades (over any
	 period of time).

	 Hence applications can be referenced in multiple application versions
	  */
	applications: IApplication[];
	applicationVersions: IApplicationVersion[];
	terminal: ITerminal;
	userAccounts: IUserAccount[];
}