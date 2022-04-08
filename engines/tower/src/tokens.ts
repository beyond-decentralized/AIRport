import { lib } from '@airport/di'
import { IInterAppAPIClient } from './core/api/InterAppAPIClient'
import { IEntityCopier } from './core/data/EntityCopier'

const tower = lib('tower')

export const ENTITY_COPIER = tower.token<IEntityCopier>('ENTITY_COPIER')
export const INTER_APP_API_CLIENT = tower.token<IInterAppAPIClient>('INTER_APP_API_CLIENT')
