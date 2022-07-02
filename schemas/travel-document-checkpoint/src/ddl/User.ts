import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
} from '@airport/air-traffic-control'

export type User_Id = number;
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
	id?: User_Id;

	@Column({ name: "ORIGIN" })
	@DbString()
	origin: User_Origin

	@Column({ name: "ORIGIN_ID" })
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

	@Column({ name: "GUID", nullable: false })
	@DbString()
	GUID?: User_GUID;

}
