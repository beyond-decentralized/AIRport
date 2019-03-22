import {diToken}        from '@airport/di'
import {IDbSchemaUtils} from './impl/query/DbSchemaUtils'
import {IStoreDriver}   from './lingo/data/StoreDriver'

export const DB_SCHEMA_UTILS = diToken<IDbSchemaUtils>()
export const STORE_DRIVER    = diToken<IStoreDriver>()
// export const TRANSACTION_CONNECTOR
