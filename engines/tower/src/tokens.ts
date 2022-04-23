import { DATABASE_FACADE } from '@airport/air-control'
import { lib } from '@airport/direction-indicator'
import { ENTITY_STATE_MANAGER } from '@airport/ground-control'
import { IEntityCopier } from './core/data/EntityCopier'

const tower = lib('tower')

export const ENTITY_COPIER = tower.token<IEntityCopier>('ENTITY_COPIER')

DATABASE_FACADE.setDependencies({
    entityStateManager: ENTITY_STATE_MANAGER
})
