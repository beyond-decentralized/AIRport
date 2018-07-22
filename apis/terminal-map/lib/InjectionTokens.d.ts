import { Token } from "typedi";
import { ITransactionManager } from "./orchestration/TransactionManager";
import { ITerminalStore } from "./store/TerminalStore";
export declare const TerminalStoreToken: Token<ITerminalStore>;
export declare const TransactionManagerToken: Token<ITransactionManager>;
