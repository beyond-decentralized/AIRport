import { system } from '@airport/di'
import { IDbUpdateCacheManager } from './core/data/DbUpdateCacheManager'
import { IEntityCopier } from './core/data/EntityCopier'
import { ITransactionalServer } from './core/data/ITransactionalServer'

const tower = system('airport').lib('tower')

export const DB_UPDATE_CACHE_MANAGER = tower.token<IDbUpdateCacheManager>('IDbUpdateCacheManager')
export const ENTITY_COPIER = tower.token<IEntityCopier>('IEntityCopier')
export const TRANSACTIONAL_SERVER = tower.token<ITransactionalServer>('ITransactionalServer')
