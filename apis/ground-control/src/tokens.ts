import { lib } from '@airport/di';
import { IEntityStateManager } from './lingo/core/operation/EntityStateManager';
import { IInterAppAPIClient } from './lingo/InterAppAPIClient';
import { ITransactionalConnector } from './lingo/ITransactionalConnector';
import { IOperationContextLoader } from './lingo/OperationContextLoader';

const groundControl = lib('ground-control');

export const ENTITY_STATE_MANAGER = groundControl.token<IEntityStateManager>('ENTITY_STATE_MANAGER')
export const INTER_APP_API_CLIENT = groundControl.token<IInterAppAPIClient>('INTER_APP_API_CLIENT')
export const OPERATION_CONTEXT_LOADER = groundControl.token<IOperationContextLoader>('OPERATION_CONTEXT_LOADER')
export const TRANSACTIONAL_CONNECTOR = groundControl.token<ITransactionalConnector>('TRANSACTIONAL_CONNECTOR');
