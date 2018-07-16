import {Token}             from "typedi";
import {ILogEntryDao}      from "./dao/LogEntryDao";
import {ILogEntryTypeDao}  from "./dao/LogEntryTypeDao";
import {ILogEntryValueDao} from "./dao/LogEntryValueDao";

export const LogEntryDaoToken = new Token<ILogEntryDao>();
export const LogEntryTypeDaoToken = new Token<ILogEntryTypeDao>();
export const LogEntryValueDaoToken = new Token<ILogEntryValueDao>();