export enum LogLevel {
	FATAL = 'FATAL',
	ERROR = 'ERROR',
	WARNING = 'WARNING',
	INFO = 'INFO',
	DEBUG = 'DEBUG',
	TRACE = 'TRACE'
}

export type SetLogLevel = LogLevel.INFO | LogLevel.DEBUG | LogLevel.TRACE;