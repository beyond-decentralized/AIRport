import {
	Column,
	DbBoolean,
	DbDate,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
} from "@airport/tarmaq-entity";
import {
	RepositoryTransactionHistory
} from '../history/RepositoryTransactionHistory'
import {
	Continent,
	Country,
	MetroArea,
	State,
	UserAccount
} from "@airport/travel-document-checkpoint/dist/app/bundle";
import { RepositoryType } from "./RepositoryType";
import { RepositoryDatabase } from "./RepositoryDatabase";
import { RepositoryClient } from "./RepositoryClient";
import { RepositoryTerminal } from "./RepositoryTerminal";
import { RepositoryApplication } from "./RepositoryApplication";
import { AgeSuitability, Application_FullName, CreatedAt, IRepository, Repository_GUID, Repository_Immutable, Repository_IsPublic, Repository_LocalId, Repository_Name, Repository_Source, Repository_UiEntryUri, Repository_Internal } from "@airport/ground-control";
import { RepositoryMember } from "./member/RepositoryMember";
import { RepositoryReference } from "./RepositoryReference";

/**
 * Created by Papa on 2/9/2017.
 */

@Entity()
@Table({
	name: "REPOSITORIES"
})
export class Repository
	implements IRepository {

	@Column({ name: 'REPOSITORY_LID', nullable: false })
	@GeneratedValue()
	@Id()
	@DbNumber()
	_localId: Repository_LocalId = null;

	@Column({ name: 'AGE_SUITABILITY', nullable: false })
	@DbNumber()
	ageSuitability: AgeSuitability

	@Column({ name: "CREATED_AT", nullable: false })
	@DbDate()
	createdAt: CreatedAt

	@Column({ name: "FULL_APPLICATION_NAME", nullable: false })
	@DbString()
	fullApplicationName: Application_FullName

	@Column({ name: "GUID", nullable: false })
	@DbString()
	GUID: Repository_GUID

	@Column({ name: "IMMUTABLE", nullable: false })
	@DbBoolean()
	immutable: Repository_Immutable

	@Column({ name: "INTERNAL", nullable: false })
	@DbBoolean()
	internal: Repository_Internal

	@Column({ name: "IS_PUBLIC", nullable: false })
	@DbBoolean()
	isPublic: Repository_IsPublic

	@Column({ name: "NAME", nullable: false })
	@DbString()
	name: Repository_Name

	@Column({ name: "SOURCE", nullable: false })
	@DbString()
	source: Repository_Source

	@Column({ name: "UI_ENTRY_URI" })
	@DbString()
	uiEntryUri: Repository_UiEntryUri

	// Local-only, represents state of the repository
	// false if only a reference stub is loaded
	@Column({ name: 'IS_LOADED', nullable: false })
	isLoaded: boolean = true

	@ManyToOne()
	@JoinColumn({
		name: 'CURRENT_REPOSITORY_TRANSACTION_HISTORY_LID',
		referencedColumnName: 'REPOSITORY_TRANSACTION_HISTORY_LID'
	})
	currentRepositoryTransactionHistory?: RepositoryTransactionHistory;

	@ManyToOne()
	@JoinColumn({
		name: 'OWNER_USER_ACCOUNT_LID',
		referencedColumnName: 'USER_ACCOUNT_LID',
		nullable: false
	})
	owner: UserAccount;

	@ManyToOne()
	@JoinColumn({ name: 'CONTINENT_ID', nullable: true })
	continent?: Continent

	@ManyToOne()
	@JoinColumn({ name: 'COUNTRY_ID', nullable: true })
	country?: Country

	@ManyToOne()
	@JoinColumn({ name: 'STATE_ID', nullable: true })
	state?: State

	@ManyToOne()
	@JoinColumn({ name: 'METRO_AREA_ID', nullable: true })
	metroArea?: MetroArea

	@OneToMany({ mappedBy: 'referencingRepository' })
	referencedRepositories: RepositoryReference[] = []

	@OneToMany({ mappedBy: 'referencedRepository' })
	referencedInRepositories: RepositoryReference[] = []

	@OneToMany({ mappedBy: 'repository' })
	repositoryMembers: RepositoryMember[] = []

	@OneToMany({ mappedBy: 'repository' })
	repositoryTransactionHistory: RepositoryTransactionHistory[] = [];

	@OneToMany({ mappedBy: 'repository' })
	repositoryApplications?: RepositoryApplication[] = []

	@OneToMany({ mappedBy: 'repository' })
	repositoryClients?: RepositoryClient[] = []

	@OneToMany({ mappedBy: 'repository' })
	repositoryDatabases?: RepositoryDatabase[] = []

	@OneToMany({ mappedBy: 'repository' })
	repositoryTerminals?: RepositoryTerminal[] = []

	@OneToMany({ mappedBy: 'repository' })
	repositoryTypes?: RepositoryType[] = []

}
