import {Token}               from "typedi";
import {ITransactionManager} from "./orchestration/TransactionManager";
import {ITerminalStore}      from "./store/TerminalStore";

export const TerminalStoreToken = new Token<ITerminalStore>();
export const TransactionManagerToken = new Token<ITransactionManager>();