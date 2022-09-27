import {
	Column,
	DbNumber,
	DbString,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
} from '@airport/tarmaq-entity'
import { Domain } from '@airport/airspace'
import { Country } from './locality/Country'
import { Continent } from './locality/Continent'
import { MetroArea } from './locality/MetroArea'
import { State } from './locality/State'

export type UserAccount_GUID = string;
export type UserAccount_Email = string;
export type UserAccount_PasswordHash = string;
export type UserAccount_Username = string;

@Entity()
export class UserAccount {

	@Id()
	@Column({ name: "GUID", nullable: false })
	@DbString()
	GUID?: UserAccount_GUID;

	@Column({ name: "EMAIL" })
	@DbString()
	email: UserAccount_Email

	@Column({ name: "PASSWORD_HASH" })
	@DbString()
	passwordHash?: UserAccount_PasswordHash

	@Column({ name: "RANKING" })
	@DbNumber()
	ranking?: number

	@Column({ name: "USERNAME" })
	@DbString()
	username: UserAccount_Username;

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
