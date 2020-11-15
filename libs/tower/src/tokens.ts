import {system}                  from '@airport/di'
import {ITransactionalServer}    from './core/data/ITransactionalServer'
import {IOperationContextLoader} from './OperationContext'

const tower = system('airport').lib('tower')

export const TRANS_SERVER             = tower.token<ITransactionalServer>('ITransactionalServer')
export const OPERATION_CONTEXT_LOADER = tower.token<IOperationContextLoader>('IOperationContextLoader')
