import {diToken}                 from '@airport/di'
import {IDbSchemaUtils}          from './impl/query/DbSchemaUtils'
import {ITransactionalConnector} from './lingo/data/ITransactionalConnector'
import {IStoreDriver}            from './lingo/data/StoreDriver'

export const DB_SCHEMA_UTILS = diToken<IDbSchemaUtils>()
export const STORE_DRIVER    = diToken<IStoreDriver>()
export const TRANS_CONNECTOR = diToken<ITransactionalConnector>()
