import { lib } from '@airport/di';
import { IEntityStateManager } from './lingo/core/operation/EntityStateManager';
import { ITransactionalConnector } from './lingo/ITransactionalConnector';
import { IOperationContextLoader } from './lingo/OperationContextLoader';

const groundControl = lib('ground-control');

export const ENTITY_STATE_MANAGER = groundControl.token<IEntityStateManager>('ENTITY_STATE_MANAGER')
export const OPERATION_CONTEXT_LOADER = groundControl.token<IOperationContextLoader>('OPERATION_CONTEXT_LOADER')
export const TRANSACTIONAL_CONNECTOR = groundControl.token<ITransactionalConnector>('TRANSACTIONAL_CONNECTOR');
