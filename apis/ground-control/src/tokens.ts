import { system }                  from '@airport/di';
import { IStoreDriver }            from './lingo/data/StoreDriver';
import { ITransactionalConnector } from './lingo/ITransactionalConnector';
import { IRxJs }                   from './lingo/IRxJs';

const groundControl = system('airport').lib('ground-control');

export const RXJS            = groundControl.token<IRxJs>('IRxJs');
export const STORE_DRIVER    = groundControl.token<IStoreDriver>('IStoreDriver');
export const TRANS_CONNECTOR = groundControl.token<ITransactionalConnector>('ITransactionalConnector');
