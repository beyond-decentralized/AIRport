import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	Table
} from '@airport/air-traffic-control'

export type TerminalRunId = number
export type TerminalRunCreateTimestamp = number
export type TerminalRunRandomNumber = number

/**
 * A record of the Terminal running (being up at a given point in time)
 */
@Entity()
@Table({name: 'TERMINAL_RUNS'})
export class TerminalRun {

	@Id()
	@GeneratedValue()
	id: TerminalRunId

	@Column({name: 'CREATE_TIMESTAMP', nullable: false})
	createTimestamp: TerminalRunCreateTimestamp

	@Column({name: 'RANDOM_NUMBER', nullable: false})
	randomNumber: TerminalRunRandomNumber

}
