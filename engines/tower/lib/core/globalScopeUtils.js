import { IOC } from "@airport/direction-indicator";
import { ENTITY_STATE_MANAGER } from "@airport/ground-control";
export function markForDeletion(entity) {
    IOC.getSync(ENTITY_STATE_MANAGER).markForDeletion(entity);
}
//# sourceMappingURL=globalScopeUtils.js.map