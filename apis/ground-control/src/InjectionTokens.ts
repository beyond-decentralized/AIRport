import {Token}                   from "typedi";
import {ISchemaUtils}            from './impl/query/SchemaUtils'
import {ITransactionalConnector} from "./lingo/data/ITransactionalConnector";
import {IStoreDriver}            from './lingo/data/StoreDriver'

export const SchemaUtilsToken = new Token<ISchemaUtils>();
export const StoreDriverToken = new Token<IStoreDriver>();
export const TransactionalConnectorToken = new Token<ITransactionalConnector>();
