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
import { Country } from './locality/Country';
import { Continent } from './locality/Continent';
import { MetroArea } from './locality/MetroArea';
import { State } from './locality/State';

export type User_LocalId = number;
export type User_GUID = string;
export type User_Email = string;
export type User_PasswordHash = string;
export type User_Username = string;
export type User_Origin = string;
export type User_OriginId = string;

@Entity()
export class User {

	@Id()
	@GeneratedValue()
	@DbNumber()
	@Column({ name: 'USER_LID' })
	_localId?: User_LocalId;

	@Column({ name: "ORIGIN" })
	@DbString()
	origin: User_Origin

	@Column({ name: "ORIGIN_LID" })
	@DbString()
	originId: User_OriginId

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
		name: 'CONTINENT_LID',
		referencedColumnName: 'CONTINENT_LID', nullable: true
	})
	continent?: Continent

	@ManyToOne()
	@JoinColumn({
		name: 'COUNTRY_LID',
		referencedColumnName: 'COUNTRY_LID', nullable: true
	})
	country?: Country

	@ManyToOne()
	@JoinColumn({
		name: 'STATE_LID',
		referencedColumnName: 'STATE_LID', nullable: true
	})
	state?: State

	@ManyToOne()
	@JoinColumn({
		name: 'METRO_AREA_LID',
		referencedColumnName: 'METRO_AREA_LID', nullable: true
	})
	metroArea?: MetroArea
}
