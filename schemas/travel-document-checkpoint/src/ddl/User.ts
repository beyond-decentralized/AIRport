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

export type User_LocalId = number;
export type User_GUID = string;
export type User_Email = string;
export type User_PasswordHash = string;
export type User_Username = string;

@Entity()
export class User {

	@Id()
	@GeneratedValue()
	@DbNumber()
	@Column({ name: 'USER_LID' })
	_localId?: User_LocalId;

	@Column({ name: "EMAIL" })
	@DbString()
	email: User_Email

	@Column({ name: "PASSWORD_HASH" })
	@DbString()
	passwordHash?: User_PasswordHash

	@Column({ name: "RANKING" })
	@DbNumber()
	ranking?: number

	@Column({ name: "USERNAME" })
	@DbString()
	username: User_Username;

	@Column({ name: "USER_GUID", nullable: false })
	@DbString()
	GUID?: User_GUID;

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
