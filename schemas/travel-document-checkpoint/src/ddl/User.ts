import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany
} from '@airport/air-traffic-control'
import { Country } from './Country';
import { UserTerminal } from './UserTerminal'
import { UserTerminalAgt } from './UserTerminalAgt'

export type User_Id = number;
export type User_UuId = string;
export type User_Email = string;
export type User_PasswordHash = string;
export type User_Username = string;

@Entity()
export class User {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: User_Id;

	@Column({ name: "EMAIL" })
	@DbString()
	email: User_Email

	@Column({ name: "PASSWORD_HASH" })
	@DbString()
	passwordHash: User_PasswordHash

	@Column({ name: "USERNAME" })
	@DbString()
	username: User_Username;

	@Column({ name: "UUID", nullable: false })
	@DbString()
	uuId: User_UuId;

	// @OneToMany({ mappedBy: 'user' })
	// userTerminal: UserTerminal[]

	// @OneToMany({ mappedBy: 'user' })
	// userTerminalAgts: UserTerminalAgt[]

}
