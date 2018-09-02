import {Token}                   from "typedi";
import {IDbSchemaUtils}          from './impl/query/DbSchemaUtils'
import {ITransactionalConnector} from "./lingo/data/ITransactionalConnector";
import {IStoreDriver}            from './lingo/data/StoreDriver'

export const DbSchemaUtilsToken = new Token<IDbSchemaUtils>();
export const StoreDriverToken = new Token<IStoreDriver>();
export const TransactionalConnectorToken = new Token<ITransactionalConnector>();
