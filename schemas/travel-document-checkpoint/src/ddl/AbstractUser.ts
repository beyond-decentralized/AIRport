import {
	Column,
	DbString,
	GeneratedValue,
	Id,
	MappedSuperclass,
	OneToMany
}                         from '@airport/air-control'
import {AbstractTerminal} from './AbstractTerminal'

export type UserId = number;
export type UserUniqueId = string;

@MappedSuperclass()
export class AbstractUser<T extends AbstractTerminal<any>> {

	@Id()
	@GeneratedValue()
	id: UserId

	@Column({name: 'UNIQUE_IDENTIFIER'})
	@DbString()
	uniqueId: UserUniqueId

	@OneToMany()
	terminals: T[]

}