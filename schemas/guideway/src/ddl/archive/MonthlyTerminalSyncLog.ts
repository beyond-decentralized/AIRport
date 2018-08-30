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
		{name: "REPOSITORY_ID", nullable: false},
		{name: "MONTH_NUMBER", nullable: false}
	])
	monthlyArchiveLog: MonthlyArchiveLog;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "TERMINAL_ID", referencedColumnName: "ID", nullable: false})
	terminal: Terminal;

	@Column({name: "ALL_ACKNOWLEDGED", nullable: false})
	@DbBoolean()
	allAcknowledged: MonthlyTerminalSyncLogAcknowledged;

	@Column({name: "DAILY_SYNC_STATUSES", nullable: false})
	@DbString()
	dailySyncStatuses: MonthlyTerminalSyncLogMonthlySyncStatuses;

}