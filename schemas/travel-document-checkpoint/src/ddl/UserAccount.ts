import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
} from '@airport/tarmaq-entity'
import { Domain } from '@airport/airspace/dist/app/bundle'
import { Country } from './locality/Country'
import { Continent } from './locality/Continent'
import { MetroArea } from './locality/MetroArea'
import { State } from './locality/State'
import { UserAccount_Email, UserAccount_GUID, UserAccount_LocalId, UserAccount_Username } from '@airport/aviation-communication'

@Entity()
export class UserAccount {

	@Id()
	@GeneratedValue()
	@DbNumber()
	@Column({ name: 'USER_ACCOUNT_LID', nullable: false })
	_localId: UserAccount_LocalId

	@Column({ name: "USER_ACCOUNT_GUID", nullable: false })
	@DbString()
	GUID?: UserAccount_GUID;

	@Column({ name: "EMAIL" })
	@DbString()
	email?: UserAccount_Email

	@Column({ name: 'PUBLIC_META_SIGNING_KEY', nullable: false })
	publicMetaSigningKey?: string

	@Column({ name: "RANKING" })
	@DbNumber()
	ranking?: number

	@Column({ name: "USERNAME" })
	@DbString()
	username?: UserAccount_Username;

	@ManyToOne()
	@JoinColumn({
		name: 'DOMAIN_LID',
		referencedColumnName: 'DOMAIN_LID'
	})
	domain?: Domain

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
}
