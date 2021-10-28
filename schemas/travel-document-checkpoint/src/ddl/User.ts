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
export type User_PrivateId = string;
export type User_PublicId = string;
export type User_Username = string;
export type User_Email = string;

@Entity()
export class User {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: UserId;

	@Column({ name: "PRIVATE_ID", nullable: false })
	@DbString()
	privateId: User_PrivateId;

	@Column({ name: "PUBLIC_ID", nullable: false })
	@DbString()
	publicId: User_PublicId;

	@Column({ name: "USERNAME" })
	@DbString()
	email: User_Username;

	@Column({ name: "EMAIL" })
	@DbString()
	username: User_Email;

	@ManyToOne()
	@JoinColumn({ name: 'COUNTRY_ID', referencedColumnName: 'ID' })
	country: Country

	@OneToMany({ mappedBy: 'user' })
	userTerminal: UserTerminal[]

	@OneToMany({ mappedBy: 'user' })
	userTerminalAgts: UserTerminalAgt[]

}
