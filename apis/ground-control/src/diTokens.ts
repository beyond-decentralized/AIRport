import {diToken}                 from '@airport/di'
import {ITransactionalConnector} from './lingo/data/ITransactionalConnector'
import {IStoreDriver}            from './lingo/data/StoreDriver'

export const STORE_DRIVER    = diToken<IStoreDriver>()
export const TRANS_CONNECTOR = diToken<ITransactionalConnector>()
