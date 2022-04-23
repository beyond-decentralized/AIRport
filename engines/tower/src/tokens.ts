import { lib } from '@airport/direction-indicator'
import { IInterAppAPIClient } from '@airport/ground-control/src/lingo/InterAppAPIClient'
import { IEntityCopier } from './core/data/EntityCopier'

const tower = lib('tower')

export const ENTITY_COPIER = tower.token<IEntityCopier>('ENTITY_COPIER')
