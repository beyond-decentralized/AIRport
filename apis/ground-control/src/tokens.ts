import { system } from '@airport/di';
import { IEntityStateManager } from './lingo/core/operation/EntityStateManager';
import { IStoreDriver } from './lingo/data/StoreDriver';
import { ITransactionalConnector } from './lingo/ITransactionalConnector';
import { IOperationContextLoader } from './lingo/OperationContextLoader';

const groundControl = system('airport').lib('ground-control');

export const ENTITY_STATE_MANAGER = groundControl.token<IEntityStateManager>('ENTITY_STATE_MANAGER')
export const OPERATION_CONTEXT_LOADER = groundControl.token<IOperationContextLoader>('OPERATION_CONTEXT_LOADER')
export const STORE_DRIVER = groundControl.token<IStoreDriver>('STORE_DRIVER');
export const TRANSACTIONAL_CONNECTOR = groundControl.token<ITransactionalConnector>('TRANSACTIONAL_CONNECTOR');
