import { system } from '@airport/di';
import { IUpdateCacheManager } from './lingo/core/operation/UpdateCacheManager';
import { IEntityStateManager } from './lingo/core/operation/EntityStateManager';
import { IStoreDriver } from './lingo/data/StoreDriver';
import { ITransactionalConnector } from './lingo/ITransactionalConnector';
import { IOperationContextLoader } from './lingo/OperationContextLoader';

const groundControl = system('airport').lib('ground-control');

export const UPDATE_CACHE_MANAGER = groundControl.token<IUpdateCacheManager>('IDbUpdateCacheManager')
export const ENTITY_STATE_MANAGER = groundControl.token<IEntityStateManager>('IEntityStateManager')
export const OPERATION_CONTEXT_LOADER = groundControl.token<IOperationContextLoader>('IOperationContextLoader')
export const STORE_DRIVER = groundControl.token<IStoreDriver>('IStoreDriver');
export const TRANSACTIONAL_CONNECTOR = groundControl.token<ITransactionalConnector>('ITransactionalConnector');
