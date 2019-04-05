import { LogEntryTypeText, LogEntryValueValue, SetLogLevel } from '@airport/runway-edge-lighting';
import { IPackagedUnit, PackagedUnitName } from '@airport/territory';
import { ILogged, Logged } from './Logged';
import { ILoggedPackage } from './LoggedPackage';
export interface ILogger extends ILogged {
    loggedPackage: ILoggedPackage;
    unit: IPackagedUnit;
    safeThrow(message: LogEntryTypeText): void;
    throw(message: LogEntryTypeText, ...values: LogEntryValueValue[]): void;
    safeFatal(message: LogEntryTypeText): string;
    fatal(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
    safeError(message: LogEntryTypeText): string;
    error(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
    safeWarn(message: LogEntryTypeText): string;
    warn(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
    safeInfo(message: LogEntryTypeText): string;
    info(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
    debug(callback: () => LogEntryTypeText | [LogEntryTypeText, LogEntryValueValue | LogEntryValueValue[]]): string;
    debug(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
    trace(callback: () => LogEntryTypeText | [LogEntryTypeText, LogEntryValueValue | LogEntryValueValue[]]): string;
    trace(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
}
export declare class Logger extends Logged implements ILogger {
    loggedPackage: ILoggedPackage;
    unit: IPackagedUnit;
    constructor(loggedPackage: ILoggedPackage, name: PackagedUnitName, level?: SetLogLevel);
    safeThrow(message: LogEntryTypeText): void;
    throw(message: LogEntryTypeText, ...values: LogEntryValueValue[]): void;
    safeFatal(message: LogEntryTypeText): string;
    fatal(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
    safeError(message: LogEntryTypeText): string;
    error(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
    safeWarn(message: LogEntryTypeText): string;
    warn(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
    safeInfo(message: LogEntryTypeText): string;
    info(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
    debug(callback: () => LogEntryTypeText | [LogEntryTypeText, LogEntryValueValue | LogEntryValueValue[]]): string;
    debug(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
    trace(callback: () => LogEntryTypeText | [LogEntryTypeText, LogEntryValueValue | LogEntryValueValue[]]): string;
    trace(message: LogEntryTypeText, ...values: LogEntryValueValue[]): string;
    private debugOrTrace;
    private log;
    private getLevelInfo;
}
