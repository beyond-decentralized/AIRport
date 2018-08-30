import {
	Column,
	DbBoolean,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
}                        from '@airport/air-control'
import {Terminal}        from '../terminal/Terminal'
import {DailyArchiveLog} from './DailyArchiveLog'

export type DailyTerminalSyncLogAcknowledged = boolean;

@Entity()
@Table({name: 'DAILY_TERMINAL_SYNC_LOG'})
// TODO: partition on each node by date
export class DailyTerminalSyncLog {

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: 'REPOSITORY_ID', nullable: false},
		{name: 'DATE_NUMBER', nullable: false}
	])
	dailyArchiveLog: DailyArchiveLog

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'TERMINAL_ID', referencedColumnName: 'ID', nullable: false})
	terminal: Terminal

	@DbNumber()
	@DbBoolean()
	@Column({name: 'ACKNOWLEDGED', nullable: false})
	acknowledged: DailyTerminalSyncLogAcknowledged

}