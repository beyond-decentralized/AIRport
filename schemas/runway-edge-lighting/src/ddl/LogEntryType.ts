import {
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                 from "@airport/air-control";
import {
	ApplicationPackage,
	PackagedUnit,
}                 from "@airport/territory";
import {LogEntry} from "./LogEntry";
import {LogLevel} from "./LogLevel";

export type LogEntryTypeId = number;
// export type LogEntryTypeCode = number;
export type LogEntryTypeText = string;

@Entity()
@Table({name: "LOG_ENTRIES"})
export class LogEntryType {

	@Id()
	@GeneratedValue()
	id: LogEntryTypeId;

	@DbNumber()
	level: LogLevel;

	// TODO: eventually, if requested, implement codes (a la ORA or TS codes)
	// code: LogEntryTypeCode;

	@ManyToOne()
	@JoinColumn({name: "APPLICATION_PACKAGE_ID", referencedColumnName: "ID"})
	applicationPackage: ApplicationPackage;

	@ManyToOne()
	@JoinColumn({name: "PACKAGED_UNIT_ID", referencedColumnName: "ID"})
	packagedUnit: PackagedUnit;

	text: LogEntryTypeText;

	@OneToMany({mappedBy: "logEntryType"})
	logEntries: LogEntry[];

}