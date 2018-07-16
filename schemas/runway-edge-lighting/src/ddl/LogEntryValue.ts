import {
	DbAny,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                 from "@airport/air-control";
import {LogEntry} from "./LogEntry";

export type LogEntryValueId = number;
export type LogEntryValuePosition = number;
export type LogEntryValueValue = boolean | number | string;

@Entity()
@Table({name: "LOG_ENTRY_VALUES"})
export class LogEntryValue {

	@Id()
	@GeneratedValue()
	id: LogEntryValueId;

	@ManyToOne()
	@JoinColumn({name: "LOG_ENTRY_ID", referencedColumnName: "ID"})
	logEntry: LogEntry;

	position: LogEntryValuePosition;

	@DbAny()
	value: LogEntryValueValue;

}