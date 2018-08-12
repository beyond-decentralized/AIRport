import {
	DbString,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                         from '@airport/air-control'
import {TerminalPassword} from '@airport/arrivals-n-departures'
import {Agt}              from './Agt'
import {Terminal}         from './Terminal'
import {UserTerminalAgt}  from './UserTerminalAgt'

@Entity()
@Table({name: 'TERMINAL_AGTS'})
export class TerminalAgt {

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'TERMINAL_ID', referencedColumnName: 'ID'})
	terminal: Terminal

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'AGT_ID', referencedColumnName: 'ID'})
	agt: Agt

	@DbString()
	password: TerminalPassword

	@OneToMany({mappedBy: 'terminalAgt'})
	userTerminalAgts: UserTerminalAgt[]
}