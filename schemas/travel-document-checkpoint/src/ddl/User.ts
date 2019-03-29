import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	OneToMany
}                         from '@airport/air-control'
import {UserTerminal}     from './UserTerminal'
import {UserTerminalAgt}  from './UserTerminalAgt'


export type UserId = number;
export type UserUniqueId = string;
export type UserFirstName = string;
export type UserLastName = string;
export type UserMiddleName = string;
export type UserPhone = string;

@Entity()
export class User {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: UserId;

	@Column({name: "UNIQUE_IDENTIFIER"})
	@DbString()
	uniqueId: UserUniqueId;

	@Column({name: "FIRST_NAME"})
	@DbString()
	firstName: UserFirstName;

	@Column({name: "LAST_NAME"})
	@DbString()
	lastName: UserLastName;

	@Column({name: "MIDDLE_NAME"})
	@DbString()
	middleName: UserMiddleName;

	@DbString()
	phone: UserPhone;

	@OneToMany({mappedBy: 'user'})
	userTerminal: UserTerminal[]

	@OneToMany({mappedBy: 'user'})
	userTerminalAgts: UserTerminalAgt[]

}