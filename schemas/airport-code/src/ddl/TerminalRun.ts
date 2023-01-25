import { ITerminalRun, TerminalRun_CreateTimestamp, TerminalRun_LocalId, TerminalRun_RandomNumber } from '@airport/ground-control'
import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	Table
} from '@airport/tarmaq-entity'


/**
 * A record of the Terminal running (being up at a given point in time)
 */
@Entity()
@Table({ name: 'TERMINAL_RUNS' })
export class TerminalRun
	implements ITerminalRun {

	@Id()
	@GeneratedValue()
	@Column({ name: 'TERMINAL_RUN_LID' })
	@DbNumber()
	_localId: TerminalRun_LocalId

	@Column({ name: 'CREATE_TIMESTAMP', nullable: false })
	@DbNumber()
	createTimestamp: TerminalRun_CreateTimestamp

	@Column({ name: 'RANDOM_NUMBER', nullable: false })
	@DbNumber()
	randomNumber: TerminalRun_RandomNumber

}
