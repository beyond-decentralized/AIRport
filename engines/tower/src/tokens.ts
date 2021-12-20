import { lib } from '@airport/di'
import { IEntityCopier } from './core/data/EntityCopier'

const tower = lib('tower')

export const ENTITY_COPIER = tower.token<IEntityCopier>('ENTITY_COPIER')
