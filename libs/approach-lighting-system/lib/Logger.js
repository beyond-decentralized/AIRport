"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runway_edge_lighting_1 = require("@airport/runway-edge-lighting");
const InjectionTokens_1 = require("./InjectionTokens");
const Logged_1 = require("./Logged");
const log = InjectionTokens_1.ApproachLightingSystemLogger.add('Logger');
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
class Logger extends Logged_1.Logged {
    constructor(loggedPackage, name, level = runway_edge_lighting_1.LogLevel.INFO) {
        super(level);
        this.loggedPackage = loggedPackage;
        this.unit = {
            name,
            package: loggedPackage.applicationPackage.package
        };
        loggedPackage.addLogger(this);
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
        return this.log(runway_edge_lighting_1.LogLevel.FATAL, message, ...values);
    }
    safeError(message) {
        return this.error(message);
    }
    error(message, ...values) {
        return this.log(runway_edge_lighting_1.LogLevel.ERROR, message, ...values);
    }
    safeWarn(message) {
        return this.warn(message);
    }
    warn(message, ...values) {
        return this.log(runway_edge_lighting_1.LogLevel.WARNING, message, ...values);
    }
    safeInfo(message) {
        return this.info(message);
    }
    info(message, ...values) {
        return this.log(runway_edge_lighting_1.LogLevel.INFO, message, ...values);
    }
    debug(callbackOrMessage, ...values) {
        return this.debugOrTrace(runway_edge_lighting_1.LogLevel.DEBUG, callbackOrMessage, values);
    }
    trace(callbackOrMessage, ...values) {
        return this.debugOrTrace(runway_edge_lighting_1.LogLevel.TRACE, callbackOrMessage, values);
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
        this.log(runway_edge_lighting_1.LogLevel.TRACE, message, ...values);
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
            case runway_edge_lighting_1.LogLevel.DEBUG:
                return [console.debug, 'DEBUG: '];
            case runway_edge_lighting_1.LogLevel.ERROR:
                return [console.error, 'FATAL: '];
            case runway_edge_lighting_1.LogLevel.FATAL:
                return [console.error, 'ERROR: '];
            case runway_edge_lighting_1.LogLevel.INFO:
                return [console.info, 'INFO:  '];
            case runway_edge_lighting_1.LogLevel.TRACE:
                return [console.trace, 'TRACE: '];
            case runway_edge_lighting_1.LogLevel.WARNING:
                return [console.warn, 'WARN:  '];
            default:
                this.throw('Unexpected LogLevel ${1}', level);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map