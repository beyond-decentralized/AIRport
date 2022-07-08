import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
} from '@airport/air-traffic-control'
import { Domain } from '@airport/airspace'
import { Country } from './locality/Country'
import { Continent } from './locality/Continent'
import { MetroArea } from './locality/MetroArea'
import { State } from './locality/State'

export type UserAccount_LocalId = number;
export type UserAccount_GUID = string;
export type UserAccount_Email = string;
export type UserAccount_PasswordHash = string;
export type UserAccount_UserAccountname = string;

@Entity()
export class UserAccount {

	@Id()
	@GeneratedValue()
	@DbNumber()
	@Column({ name: 'USER_ACCOUNT_LID' })
	_localId?: UserAccount_LocalId;

	@Column({ name: "EMAIL" })
	@DbString()
	email: UserAccount_Email

	@Column({ name: "PASSWORD_HASH" })
	@DbString()
	passwordHash?: UserAccount_PasswordHash

	@Column({ name: "RANKING" })
	@DbNumber()
	ranking?: number

	@Column({ name: "USER_ACCOUNTNAME" })
	@DbString()
	username: UserAccount_UserAccountname;

	@Column({ name: "USER_ACCOUNT_GUID", nullable: false })
	@DbString()
	GUID?: UserAccount_GUID;

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
