import { LogLevel } from '@airport/runway-edge-lighting';
import { APPROACH_LIGHTING_SYSTEM_LOGGER } from './Constants';
import { Logged } from './Logged';
var log;
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
export class Logger extends Logged {
    constructor(loggedPackage, name, level = LogLevel.INFO) {
        super(level);
        this.loggedPackage = loggedPackage;
        this.unit = {
            id: null,
            name,
            package: loggedPackage.applicationPackage.package
        };
        loggedPackage.addLogger(this);
        setTimeout(() => {
            log = APPROACH_LIGHTING_SYSTEM_LOGGER.add('Logger');
        });
    }
    safeThrow(message) {
        this.throw(message);
    }
    throw(message, ...values) {
        message = this.error(message, ...values);
        throw new Error(message);
    }
    safeFatal(message) {
        return this.fatal(message);
    }
    fatal(message, ...values) {
        return this.log(LogLevel.FATAL, message, ...values);
    }
    safeError(message) {
        return this.error(message);
    }
    error(message, ...values) {
        return this.log(LogLevel.ERROR, message, ...values);
    }
    safeWarn(message) {
        return this.warn(message);
    }
    warn(message, ...values) {
        return this.log(LogLevel.WARNING, message, ...values);
    }
    safeInfo(message) {
        return this.info(message);
    }
    info(message, ...values) {
        return this.log(LogLevel.INFO, message, ...values);
    }
    debug(callbackOrMessage, ...values) {
        return this.debugOrTrace(LogLevel.DEBUG, callbackOrMessage, values);
    }
    trace(callbackOrMessage, ...values) {
        return this.debugOrTrace(LogLevel.TRACE, callbackOrMessage, values);
    }
    debugOrTrace(atLevel, callbackOrMessage, values) {
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
            }
            else if (result instanceof Array) {
                if (result.length != 2) {
                    log.throw(debugTraceApiErrorMessage);
                }
                message = result[0];
                if (result[1] instanceof Array) {
                    values = result[1];
                }
                else {
                    values = [result[1]];
                }
            }
            else {
                log.throw(debugTraceApiErrorMessage);
            }
        }
        else {
            message = callbackOrMessage;
        }
        this.log(LogLevel.TRACE, message, ...values);
    }
    log(level, message, ...values) {
        const now = new Date();
        let finalMessage = message;
        if (values && values.length) {
            for (let i = 0; i < values.length; i++) {
                const value = values[i];
                const valueString = (value !== null && value !== undefined) ?
                    values[i].toString() : value;
                const previousMessage = finalMessage;
                finalMessage = finalMessage.replace(`{${i + 1}}`, valueString);
                if (previousMessage === finalMessage) {
                    const parameters = values.map((value, index) => {
                        return `{${index + 1}}:  ${value}
`;
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
    getLevelInfo(level) {
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
//# sourceMappingURL=Logger.js.map