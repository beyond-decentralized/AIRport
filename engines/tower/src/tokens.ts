import { lib } from '@airport/direction-indicator'
import { EntityCopier, IEntityCopier } from './core/data/EntityCopier'

const tower = lib('tower')

export const ENTITY_COPIER = tower.token<IEntityCopier>({
    class: EntityCopier,
    interface: 'IEntityCopier',
    token: 'ENTITY_COPIER'
})
