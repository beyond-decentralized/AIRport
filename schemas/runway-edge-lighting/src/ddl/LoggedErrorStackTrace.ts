import {
	Column,
	Entity,
	Id,
	Table
} from "@airport/air-control";

export type LoggedErrorStackTraceId = number;
export type LoggedErrorStackTraceStack = string;
export type LoggedErrorStackTraceStackHash = string;

@Entity()
@Table({name: "LOGGED_ERROR_STACK_TRACE"})
export class LoggedErrorStackTrace {

	@Id()
	id: LoggedErrorStackTraceId;

	@Column({name: "STACK_HASH"})
	stackHash: LoggedErrorStackTraceStackHash;

	stack: LoggedErrorStackTraceStack;

}