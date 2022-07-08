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
} from "@airport/air-traffic-control";
import {
	RepositoryTransactionHistory
} from '../history/RepositoryTransactionHistory'
import {
	Continent,
	Country,
	MetroArea,
	State,
	UserAccount
} from "@airport/travel-document-checkpoint";
import { RepositoryType } from "./RepositoryType";
import { RepositoryDatabase } from "./RepositoryDatabase";
import { RepositoryClient } from "./RepositoryClient";
import { RepositoryTerminal } from "./RepositoryTerminal";
import { RepositoryApplication } from "./RepositoryApplication";

/**
 * Created by Papa on 2/9/2017.
 */

export type Repository_AgeSuitability = 0 | 7 | 13 | 18
export type Repository_CreatedAt = Date;
export type Repository_LocalId = number;
export type Repository_Immutable = boolean;
export type Repository_Source = string;
export type Repository_GUID = string;

export interface IRepositoryIdentifier {
	source: Repository_Source;
	GUID: Repository_GUID;
}

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
	_localId: Repository_LocalId;

	@Column({ name: "GUID", nullable: false })
	@DbString()
	GUID: Repository_GUID;

	@Column({ name: 'AGE_SUITABILITY', nullable: false })
	@DbNumber()
	ageSuitability: Repository_AgeSuitability

	@Column({ name: "CREATED_AT", nullable: false })
	@DbDate()
	createdAt: Repository_CreatedAt;

	@Column({ name: "IMMUTABLE", nullable: false })
	immutable: Repository_Immutable

	@Column({ name: "SOURCE", nullable: false })
	@DbString()
	source: Repository_Source

	@ManyToOne()
	@JoinColumn({
		name: 'OWNER_USER_ACCOUNT_LID', referencedColumnName: 'USER_ACCOUNT_LID',
		nullable: false
	})
	owner: UserAccount;

	@OneToMany({ mappedBy: 'repository' })
	repositoryTransactionHistory: RepositoryTransactionHistory[] = [];

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
	repositoryApplications: RepositoryApplication[]

	@OneToMany({ mappedBy: 'repository' })
	repositoryClients: RepositoryClient[]

	@OneToMany({ mappedBy: 'repository' })
	repositoryDatabases: RepositoryDatabase[]

	@OneToMany({ mappedBy: 'repository' })
	repositoryTerminals: RepositoryTerminal[]

	@OneToMany({ mappedBy: 'repository' })
	repositoryTypes: RepositoryType[]

}
