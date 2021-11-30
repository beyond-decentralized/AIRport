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
} from '@airport/air-control'
import { Country } from './Country';
import { UserTerminal } from './UserTerminal'
import { UserTerminalAgt } from './UserTerminalAgt'

export type UserId = number;
export type User_UuId = string;
export type User_Username = string;

@Entity()
export class User {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: UserId;

	@Column({ name: "UUID", nullable: false })
	@DbString()
	uuId: User_UuId;

	@Column({ name: "USERNAME" })
	@DbString()
	username: User_Username;

	@OneToMany({ mappedBy: 'user' })
	userTerminal: UserTerminal[]

	@OneToMany({ mappedBy: 'user' })
	userTerminalAgts: UserTerminalAgt[]

}
