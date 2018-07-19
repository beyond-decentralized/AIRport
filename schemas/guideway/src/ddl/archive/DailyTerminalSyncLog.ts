import {
	DbBoolean,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
}                        from "@airport/air-control";
import {Terminal}        from "../terminal/Terminal";
import {DailyArchiveLog} from "./DailyArchiveLog";

export type DailyTerminalSyncLogAcknowledged = boolean;

@Entity()
@Table({name: "DAILY_TERMINAL_SYNC_LOG"})
// TODO: partition on each node by date
export class DailyTerminalSyncLog {

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "REPOSITORY_ID"},
		{name: "DATE_NUMBER"}
	])
	dailyArchiveLog: DailyArchiveLog;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "TERMINAL_ID", referencedColumnName: "ID"})
	terminal: Terminal;

	@DbNumber()
	@DbBoolean()
	acknowledged: DailyTerminalSyncLogAcknowledged;

}