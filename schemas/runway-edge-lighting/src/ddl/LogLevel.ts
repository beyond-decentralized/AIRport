export enum LogLevel {
	FATAL,
	ERROR,
	WARNING,
	INFO,
	DEBUG,
	TRACE
}

export type SetLogLevel = LogLevel.INFO | LogLevel.DEBUG | LogLevel.TRACE;