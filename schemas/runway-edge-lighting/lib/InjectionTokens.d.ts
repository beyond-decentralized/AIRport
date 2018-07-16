import { Token } from "typedi";
import { ILogEntryDao } from "./dao/LogEntryDao";
import { ILogEntryTypeDao } from "./dao/LogEntryTypeDao";
import { ILogEntryValueDao } from "./dao/LogEntryValueDao";
export declare const LogEntryDaoToken: Token<ILogEntryDao>;
export declare const LogEntryTypeDaoToken: Token<ILogEntryTypeDao>;
export declare const LogEntryValueDaoToken: Token<ILogEntryValueDao>;
