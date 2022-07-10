import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	Table
} from '@airport/tarmaq-entity'

export type TerminalRun_LocalId = number
export type TerminalRun_CreateTimestamp = number
export type TerminalRun_RandomNumber = number

/**
 * A record of the Terminal running (being up at a given point in time)
 */
@Entity()
@Table({ name: 'TERMINAL_RUNS' })
export class TerminalRun {

	@Id()
	@GeneratedValue()
	@Column({ name: 'TERMINAL_RUN_LID' })
	_localId: TerminalRun_LocalId

	@Column({ name: 'CREATE_TIMESTAMP', nullable: false })
	createTimestamp: TerminalRun_CreateTimestamp

	@Column({ name: 'RANDOM_NUMBER', nullable: false })
	randomNumber: TerminalRun_RandomNumber

}
