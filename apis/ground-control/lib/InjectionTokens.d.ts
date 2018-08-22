import { Token } from "typedi";
import { ISchemaUtils } from './impl/query/SchemaUtils';
import { ITransactionalConnector } from "./lingo/data/ITransactionalConnector";
import { IStoreDriver } from './lingo/data/StoreDriver';
export declare const SchemaUtilsToken: Token<ISchemaUtils>;
export declare const StoreDriverToken: Token<IStoreDriver>;
export declare const TransactionalConnectorToken: Token<ITransactionalConnector>;
