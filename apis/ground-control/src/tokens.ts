import { system }                  from '@airport/di';
import { IStoreDriver }            from './lingo/data/StoreDriver';
import { ITransactionalConnector } from './lingo/ITransactionalConnector';

const groundControl = system('airport').lib('ground-control');

export const STORE_DRIVER    = groundControl.token<IStoreDriver>('IStoreDriver');
export const TRANSACTIONAL_CONNECTOR = groundControl.token<ITransactionalConnector>('ITransactionalConnector');
