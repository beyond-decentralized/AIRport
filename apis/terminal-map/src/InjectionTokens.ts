import {Token}          from "typedi";
import {ITerminalStore} from "./store/TerminalStore";

export const TerminalStoreToken = new Token<ITerminalStore>();