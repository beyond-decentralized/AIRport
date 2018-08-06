import {
	DbString,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/air-control'
import {
	TerminalId,
	TerminalPassword
}                 from '@airport/arrivals-n-departures'
import {Agt}      from './Agt'
import {Terminal} from './Terminal'

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

}