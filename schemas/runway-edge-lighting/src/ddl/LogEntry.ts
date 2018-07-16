import {
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                      from "@airport/air-control";
import {LogEntryType}  from "./LogEntryType";
import {LogEntryValue} from "./LogEntryValue";

export type LogEntryId = number;
export type LogEntryTimestamp = Date;

@Entity()
@Table({name: "LOG_ENTRY"})
export class LogEntry {

	@Id()
	@GeneratedValue()
	id: LogEntryId;

	timestamp: LogEntryTimestamp;

	@ManyToOne()
	@JoinColumn({name: "LOG_ENTRY_TYPE_ID", referencedColumnName: "ID"})
	type: LogEntryType;

	@OneToMany({mappedBy: "logEntry"})
	values: LogEntryValue[];

}