import {
	DbString,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                         from '@airport/air-traffic-control'
import {Agt}              from './Agt'
import {Terminal}         from './Terminal'
import {UserTerminalAgt}  from './UserTerminalAgt'

/**
 * 
 * DEPRECATED - syncing will now be done via IPFS/Peergos
 * 
 */
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

	password: string

	@OneToMany({mappedBy: 'terminalAgt'})
	userTerminalAgts: UserTerminalAgt[]
}