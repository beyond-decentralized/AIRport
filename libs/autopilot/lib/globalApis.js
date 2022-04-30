import { IOC } from '@airport/direction-indicator';
import { UI_STATE_MANAGER } from './tokens';
export function markForDeletion(entity) {
    IOC.getSync(UI_STATE_MANAGER).markForDeletion(entity);
}
export function isDeleted(entity) {
    return IOC.getSync(UI_STATE_MANAGER).isDeleted(entity);
}
//# sourceMappingURL=globalApis.js.map