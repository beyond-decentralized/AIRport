import { IOC } from '@airport/direction-indicator'
import { UI_STATE_MANAGER } from './tokens';

export function markForDeletion<T>(
    entity: T
) {
    IOC.getSync(UI_STATE_MANAGER).markForDeletion(entity);
}

export function isDeleted<T>(
    entity: T
): boolean {
    return IOC.getSync(UI_STATE_MANAGER).isDeleted(entity);
}
