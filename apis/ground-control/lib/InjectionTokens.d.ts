import { Token } from "typedi";
import { IDbSchemaUtils } from './impl/query/DbSchemaUtils';
import { ITransactionalConnector } from "./lingo/data/ITransactionalConnector";
import { IStoreDriver } from './lingo/data/StoreDriver';
export declare const DbSchemaUtilsToken: Token<IDbSchemaUtils>;
export declare const StoreDriverToken: Token<IStoreDriver>;
export declare const TransactionalConnectorToken: Token<ITransactionalConnector>;
