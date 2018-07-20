import { ILogger } from "@airport/approach-lighting-system";
import { TerminalCredentials } from "@airport/arrivals-n-departures";
import { ServerErrorType } from "../../model/ServerErrorType";
export declare type ErroneousEntityInfo = string | number;
export interface IErrorLogger {
    logError(log: ILogger, errorType: ServerErrorType, terminalCredentials: TerminalCredentials, erroneousEntityInfo: ErroneousEntityInfo): Promise<void>;
}
export declare class ErrorLogger implements IErrorLogger {
    logError(log: ILogger, errorType: ServerErrorType, terminalCredentials: TerminalCredentials, erroneousEntityInfo: ErroneousEntityInfo): Promise<void>;
}
