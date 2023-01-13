import {
	Column,
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
import {
	IRepositoryIdentifier,
	Repository_AgeSuitability,
	Repository_CreatedAt,
	Repository_GUID,
	Repository_Immutable,
	Repository_LocalId,
	Repository_Name,
	Repository_Source,
	Repository_UiEntryUri
} from "../../types";
import { Application_FullName } from "@airport/ground-control";
import { RepositoryMember } from "./RepositoryMember";

/**
 * Created by Papa on 2/9/2017.
 */

@Entity()
@Table({
	name: "REPOSITORY"
})
export class Repository
	implements IRepositoryIdentifier {

	@Column({ name: "REPOSITORY_LID" })
	@GeneratedValue()
	@Id()
	@DbNumber()
	_localId: Repository_LocalId = null;

	@Column({ name: 'AGE_SUITABILITY', nullable: false })
	@DbNumber()
	ageSuitability?: Repository_AgeSuitability

	@Column({ name: "CREATED_AT", nullable: false })
	@DbDate()
	createdAt?: Repository_CreatedAt

	@Column({ name: "FULL_APPLICATION_NAME", nullable: false })
	@DbString()
	fullApplicationName?: Application_FullName

	@Column({ name: "GUID", nullable: false })
	@DbString()
	GUID?: Repository_GUID

	@Column({ name: "IMMUTABLE", nullable: false })
	immutable?: Repository_Immutable

	@Column({ name: "NAME", nullable: false })
	@DbString()
	name?: Repository_Name

	@Column({ name: "SOURCE", nullable: false })
	@DbString()
	source?: Repository_Source

	@Column({ name: "UI_ENTRY_URI", nullable: true })
	@DbString()
	uiEntryUri?: Repository_UiEntryUri

	@Column({ name: 'ARE_DEPENDENCIES_LOADED', nullable: false })
	areDependenciesLoaded?: boolean = false

	@ManyToOne()
	@JoinColumn({
		name: 'OWNER_USER_ACCOUNT_LID',
		referencedColumnName: 'USER_ACCOUNT_LID',
		nullable: false
	})
	owner?: UserAccount;

	@ManyToOne()
	@JoinColumn({
		name: 'CONTINENT_ID',
		referencedColumnName: 'CONTINENT_ID', nullable: true
	})
	continent?: Continent

	@ManyToOne()
	@JoinColumn({
		name: 'COUNTRY_ID',
		referencedColumnName: 'COUNTRY_ID', nullable: true
	})
	country?: Country

	@ManyToOne()
	@JoinColumn({
		name: 'STATE_ID',
		referencedColumnName: 'STATE_ID', nullable: true
	})
	state?: State

	@ManyToOne()
	@JoinColumn({
		name: 'METRO_AREA_ID',
		referencedColumnName: 'METRO_AREA_ID', nullable: true
	})
	metroArea?: MetroArea

	@OneToMany({ mappedBy: 'repository' })
	repositoryMembers?: RepositoryMember[] = []

	@OneToMany({ mappedBy: 'repository' })
	repositoryTransactionHistory?: RepositoryTransactionHistory[] = [];

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
