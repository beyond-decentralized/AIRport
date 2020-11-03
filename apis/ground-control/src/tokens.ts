import {system}                  from '@airport/di'
import {ITransactionalConnector} from '../../../libs/tower/src/ITransactionalConnector'
import {IStoreDriver}            from './lingo/data/StoreDriver'

const groundControl = system('airport').lib('ground-control')

export const STORE_DRIVER    = groundControl.token<IStoreDriver>()
export const TRANS_CONNECTOR = groundControl.token<ITransactionalConnector>()
