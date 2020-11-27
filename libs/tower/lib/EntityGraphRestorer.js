import { getOperationUniqueId, isStub } from '@airport/air-control';
export class EntityGraphRestorer {
    restoreEntityGraph(root) {
        if (!(root instanceof Array)) {
            root = [root];
        }
        const entitiesByOperationIndex = [];
        this.linkEntityGraph(root, entitiesByOperationIndex);
        this.linkEntityGraph(root, entitiesByOperationIndex, false);
    }
    linkEntityGraph(currentEntities, entitiesByOperationIndex, checkForDuplicates = true) {
        for (const currentEntity of currentEntities) {
            const operationUniqueId = getOperationUniqueId(currentEntity);
            const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId];
            let entityIsStub = isStub(currentEntity);
            if (previouslyFoundEntity && entityIsStub) {
            }
            if (checkForDuplicates && entitiesByOperationIndex[operationUniqueId]) {
            }
        }
    }
}
//# sourceMappingURL=EntityGraphRestorer.js.map