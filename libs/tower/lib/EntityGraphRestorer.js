import { ENTITY_STATE_MANAGER } from '@airport/air-control';
import { DI } from '@airport/di';
export class EntityGraphRestorer {
    restoreEntityGraph(root) {
        if (!(root instanceof Array)) {
            root = [root];
        }
        const entityStateManager = DI.db().getSync(ENTITY_STATE_MANAGER);
        const entitiesByOperationIndex = [];
        this.linkEntityGraph(root, entitiesByOperationIndex, entityStateManager);
        this.linkEntityGraph(root, entitiesByOperationIndex, entityStateManager, false);
    }
    linkEntityGraph(currentEntities, entitiesByOperationIndex, entityStateManager, checkForDuplicates = true) {
        for (const currentEntity of currentEntities) {
            const operationUniqueId = entityStateManager.getOperationUniqueId(currentEntity);
            const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId];
            let entityIsStub = entityStateManager.isStub(currentEntity);
            if (previouslyFoundEntity && entityIsStub) {
            }
            if (checkForDuplicates && entitiesByOperationIndex[operationUniqueId]) {
            }
        }
    }
}
//# sourceMappingURL=EntityGraphRestorer.js.map