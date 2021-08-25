import { system } from '@airport/di'
import { ILocalAPIServer } from './core/api/LocalAPIServer'
import { IEntityCopier } from './core/data/EntityCopier'

const tower = system('airport').lib('tower')

export const ENTITY_COPIER = tower.token<IEntityCopier>('IEntityCopier')
export const LOCAL_API_SERVER = tower.token<ILocalAPIServer>('ILocalAPIServer')
