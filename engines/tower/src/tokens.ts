import { system } from '@airport/di'
import { IEntityCopier } from './core/data/EntityCopier'

const tower = system('airport').lib('tower')

export const ENTITY_COPIER = tower.token<IEntityCopier>('ENTITY_COPIER')
