import {
	Column,
	DbString,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	MappedSuperclass
}                     from '@airport/air-control'
import {AbstractUser} from './AbstractUser'

export type TerminalId = number;

@MappedSuperclass()
export class AbstractTerminal<U extends AbstractUser<any>> {

	@Id()
	@GeneratedValue()
	id: TerminalId

	@DbString()
	name: TerminalName

	@DbString()
	password: TerminalPassword

	@Column({name: 'SECOND_ID'})
	secondId: TerminalSecondId

	@ManyToOne()
	@JoinColumn({name: 'OWNER_USER_ID', referencedColumnName: 'ID'})
	owner: U

}
