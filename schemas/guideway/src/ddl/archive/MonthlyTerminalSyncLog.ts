import {
	Column,
	DbBoolean,
	DbString,
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
}                          from "@airport/air-control";
import {Terminal}          from "../terminal/Terminal";
import {MonthlyArchiveLog} from "./MonthlyArchiveLog";

export type MonthlyTerminalSyncLogAcknowledged = boolean;
export type MonthlyTerminalSyncLogMonthlySyncStatuses = string;

@Entity()
@Table({name: "MONTHLY_TERMINAL_SYNC_LOG"})
// TODO: partition on each node by date
export class MonthlyTerminalSyncLog {

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "REPOSITORY_ID"},
		{name: "MONTH_NUMBER"}
	])
	monthlyArchiveLog: MonthlyArchiveLog;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "TERMINAL_ID", referencedColumnName: "ID"})
	terminal: Terminal;

	@Column({name: "ALL_ACKNOWLEDGED"})
	@DbBoolean()
	allAcknowledged: MonthlyTerminalSyncLogAcknowledged;

	@Column({name: "DAILY_SYNC_STATUSES", columnDefinition: "BOOL[]"})
	@DbString()
	dailySyncStatuses: MonthlyTerminalSyncLogMonthlySyncStatuses;

}