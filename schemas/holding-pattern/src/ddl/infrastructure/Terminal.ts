import {
	Column,
	DbBoolean,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany
}                     from '@airport/air-control'
import {
	TerminalName,
	TerminalSecondId
}                     from '@airport/arrivals-n-departures'
import {IUser}        from '../../generated/infrastructure/quser'
import {TerminalAgt}  from './TerminalAgt'
import {UserTerminal} from './UserTerminal'

export type TmTerminalId = number;
export type TerminalIsLocal = boolean;

@Entity()
export class Terminal {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: TmTerminalId

	name: TerminalName

	@Column({name: 'SECOND_ID'})
	@DbNumber()
	secondId: TerminalSecondId

	@ManyToOne()
	@JoinColumn({name: 'OWNER_USER_ID', referencedColumnName: 'ID'})
	owner: IUser

	@Column({name: 'IS_LOCAL'})
	@DbBoolean()
	isLocal: TerminalIsLocal = false

	@OneToMany({mappedBy: 'terminal'})
	terminalAgts: TerminalAgt[]

	@OneToMany({mappedBy: 'terminal'})
	userTerminal: UserTerminal[]
}