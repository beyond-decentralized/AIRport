import { lib } from '@airport/direction-indicator'
import { IEntityCopier } from './core/data/EntityCopier'

const tower = lib('tower')

export const ENTITY_COPIER = tower.token<IEntityCopier>('ENTITY_COPIER')
