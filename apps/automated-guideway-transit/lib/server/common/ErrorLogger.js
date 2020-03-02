"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../tokens");
class ErrorLogger {
    async logError(log, errorType, terminalCredentials, erroneousEntityInfo) {
        log.error(`AGT error:
		Type:               {1}
		TerminalId:         {2}
		TerminalPassword:   {3}
		Entity w/ Error Id: {4}`, errorType, terminalCredentials[0], terminalCredentials[1], erroneousEntityInfo);
    }
}
exports.ErrorLogger = ErrorLogger;
di_1.DI.set(tokens_1.ERROR_LOGGER, ErrorLogger);
//# sourceMappingURL=ErrorLogger.js.map