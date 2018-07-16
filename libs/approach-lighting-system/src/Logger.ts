import {
	LogEntryTypeText,
	LogEntryValueValue,
	LogLevel,
	SetLogLevel
}                                     from "@airport/runway-edge-lighting";
import {
	IPackagedUnit,
	PackagedUnitName
}                                     from "@airport/territory";
import {ApproachLightingSystemLogger} from "./InjectionTokens";
import {
	ILogged,
	Logged
}                                     from "./Logged";
import {ILoggedPackage}               from "./LoggedPackage";

export interface ILogger
	extends ILogged {

	loggedPackage: ILoggedPackage;
	unit: IPackagedUnit;

	safeThrow(
		message: LogEntryTypeText
	): void;

	throw(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): void;

	safeFatal(
		message: LogEntryTypeText
	): string;

	fatal(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string;

	safeError(
		message: LogEntryTypeText
	): string;

	error(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string;

	safeWarn(
		message: LogEntryTypeText
	): string;

	warn(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string;

	safeInfo(
		message: LogEntryTypeText
	): string;

	info(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string;

	debug(
		callback: () => LogEntryTypeText | [
			LogEntryTypeText,
			LogEntryValueValue | LogEntryValueValue[]
			]
	): string;

	debug(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string;


	trace(
		callback: () => LogEntryTypeText | [
			LogEntryTypeText,
			LogEntryValueValue | LogEntryValueValue[]
			]
	): string;

	trace(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string;

}

const log = ApproachLightingSystemLogger.add('Logger');

const debugTraceApiErrorMessage = `Invalid Logger.debug|trace call,
				call does not adhere to to the API:
	debug(
		callback: () => LogEntryTypeText | [
			LogEntryTypeText,
			LogEntryValueValue | LogEntryValueValue[]
			]
	): string;

	debug(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string;
					`;

export class Logger
	extends Logged
	implements ILogger {

	unit: IPackagedUnit;

	constructor(
		public loggedPackage: ILoggedPackage,
		name: PackagedUnitName,
		level: SetLogLevel = LogLevel.INFO
	) {
		super(level);
		this.unit = {
			name,
			package: loggedPackage.applicationPackage.package
		};
		loggedPackage.addLogger(this);
	}

	safeThrow(
		message: LogEntryTypeText
	): void {
		this.throw(message);
	}

	throw(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): void {
		message = this.error(message, ...values);
		throw new Error(message);
	}

	safeFatal(
		message: LogEntryTypeText
	): string {
		return this.fatal(message);
	}

	fatal(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string {
		return this.log(LogLevel.FATAL, message, ...values);
	}

	safeError(
		message: LogEntryTypeText
	): string {
		return this.error(message);
	}

	error(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string {
		return this.log(LogLevel.ERROR, message, ...values);
	}

	safeWarn(
		message: LogEntryTypeText
	): string {
		return this.warn(message);
	}

	warn(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string {
		return this.log(LogLevel.WARNING, message, ...values);
	}

	safeInfo(
		message: LogEntryTypeText
	): string {
		return this.info(message);
	}

	info(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string {
		return this.log(LogLevel.INFO, message, ...values);
	}


	debug(
		callback: () => LogEntryTypeText | [
			LogEntryTypeText,
			LogEntryValueValue | LogEntryValueValue[]
			]
	): string;
	debug(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string;
	debug(
		callbackOrMessage,
		...values: LogEntryValueValue[]
	) {
		return this.debugOrTrace(LogLevel.DEBUG, callbackOrMessage, values);
	}

	trace(
		callback: () => LogEntryTypeText | [
			LogEntryTypeText,
			LogEntryValueValue | LogEntryValueValue[]
			]
	): string
	trace(
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string;
	trace(
		callbackOrMessage,
		...values: LogEntryValueValue[]
	) {
		return this.debugOrTrace(LogLevel.TRACE, callbackOrMessage, values);
	}

	private debugOrTrace(
		atLevel: LogLevel,
		callbackOrMessage: () => LogEntryTypeText | [
			LogEntryTypeText,
			LogEntryValueValue | LogEntryValueValue[]
			]
			| LogEntryTypeText,
		values: LogEntryValueValue[]
	): string {
		if (this.level < atLevel) {
			return '';
		}
		let message;
		if (typeof callbackOrMessage === 'function') {
			if (arguments.length !== 1) {
				log.throw(debugTraceApiErrorMessage);
			}
			const result = callbackOrMessage();
			let params;
			if (typeof result === 'string') {
				message = result;
				values = [];
			} else if (result instanceof Array) {
				if (result.length != 2) {
					log.throw(debugTraceApiErrorMessage);
				}
				message = result[0];
				if (result[1] instanceof Array) {
					values = <any>result[1];
				} else {
					values = <any>[result[1]];
				}
			} else {
				log.throw(debugTraceApiErrorMessage);
			}
		} else {
			message = callbackOrMessage;
		}

		this.log(LogLevel.TRACE, message, ...values);
	}

	private log(
		level: LogLevel,
		message: LogEntryTypeText,
		...values: LogEntryValueValue[]
	): string {
		const now = new Date();
		let finalMessage = message;
		if (values && values.length) {
			for (let i = 0; i < values.length; i++) {
				const value = values[i];
				const valueString: any = (value !== null && value !== undefined) ?
					values[i].toString() : value;
				const previousMessage = finalMessage;
				finalMessage = finalMessage.replace(`{${i + 1}}`, valueString);
				if (previousMessage === finalMessage) {
					const parameters = values.map((
						value,
						index
					) => {
						return `{${index + 1}}:  ${value}
`
					});
					this.throw(`Did not find {${i + 1}} in "${message}"
	expecting {X} for every parameter passed in to a logging function (X >= 1)
	
	message:
${message}

	parameters:
${parameters}
`);
				}
			}
		}
		// FIXME: record messages to the database
		// TODO: do not record undefined values - their absence is their record

		const [logFunction, lvl] = this.getLevelInfo(level);

		const unitHierarchy = `${this.unit.package.name}:${this.unit.name}`;
		logFunction(`${lvl}${now.toISOString()} [${unitHierarchy}]: ${finalMessage}`);

		return finalMessage;
	}

	private getLevelInfo(
		level: LogLevel
	): [Function, string] {
		switch (level) {
			case LogLevel.DEBUG:
				return [console.debug, 'DEBUG: '];
			case LogLevel.ERROR:
				return [console.error, 'FATAL: '];
			case LogLevel.FATAL:
				return [console.error, 'ERROR: '];
			case LogLevel.INFO:
				return [console.info, 'INFO:  '];
			case LogLevel.TRACE:
				return [console.trace, 'TRACE: '];
			case LogLevel.WARNING:
				return [console.warn, 'WARN:  '];
			default:
				this.throw('Unexpected LogLevel ${1}', level);
		}
	}

}