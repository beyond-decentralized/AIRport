import { Token } from "typedi";
import { ITransactionalConnector } from "./lingo/data/ITransactionalConnector";
import { IStoreDriver } from './lingo/data/StoreDriver';
export declare const TransactionalConnectorToken: Token<ITransactionalConnector>;
export declare const StoreDriverToken: Token<IStoreDriver>;
