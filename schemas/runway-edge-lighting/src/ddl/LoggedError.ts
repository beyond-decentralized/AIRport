import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                              from "@airport/air-control";
import {LogEntry}              from "./LogEntry";
import {LoggedErrorStackTrace} from "./LoggedErrorStackTrace";

@Entity()
@Table({name: "LOGGED_ERROR"})
export class LoggedError {

	@Id()
	@ManyToOne()
	@JoinColumn({name: "LOG_ENTRY_ID", referencedColumnName: "ID"})
	logEntry: LogEntry;

	@ManyToOne()
	@JoinColumn({name: "LOGGED_ERROR_STACK_TRACE_ID", referencedColumnName: "ID"})
	stackTrace: LoggedErrorStackTrace;

}