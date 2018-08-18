import {Token}                   from "typedi";
import {ITransactionalConnector} from "./lingo/data/ITransactionalConnector";
import {IStoreDriver}            from './lingo/data/StoreDriver'

export const TransactionalConnectorToken = new Token<ITransactionalConnector>();
export const StoreDriverToken = new Token<IStoreDriver>();