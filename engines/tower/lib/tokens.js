import { lib } from '@airport/direction-indicator';
import { EntityCopier } from './core/data/EntityCopier';
const tower = lib('tower');
export const ENTITY_COPIER = tower.token({
    class: EntityCopier,
    interface: 'IEntityCopier',
    token: 'ENTITY_COPIER'
});
//# sourceMappingURL=tokens.js.map