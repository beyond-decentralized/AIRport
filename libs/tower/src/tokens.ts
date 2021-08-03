import { system } from '@airport/di'
import { IEntityCopier } from './core/data/EntityCopier'
import { ITransactionalServer } from './core/data/ITransactionalServer'

const tower = system('airport').lib('tower')

export const ENTITY_COPIER = tower.token<IEntityCopier>('IEntityCopier')
export const TRANSACTIONAL_SERVER = tower.token<ITransactionalServer>('ITransactionalServer')
