import { DI } from '@airport/di';
import { ERROR_LOGGER } from "../../tokens";
export class ErrorLogger {
    async logError(log, errorType, terminalCredentials, erroneousEntityInfo) {
        log.error(`AGT error:
		Type:               {1}
		TerminalId:         {2}
		TerminalPassword:   {3}
		Entity w/ Error Id: {4}`, errorType, terminalCredentials[0], terminalCredentials[1], erroneousEntityInfo);
    }
}
DI.set(ERROR_LOGGER, ErrorLogger);
//# sourceMappingURL=ErrorLogger.js.map