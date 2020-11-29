export class EntityGraphRestorer {
    restoreEntityGraph(root, context) {
        if (!(root instanceof Array)) {
            root = [root];
        }
        const entitiesByOperationIndex = [];
        this.linkEntityGraph(root, entitiesByOperationIndex, context);
        // On the second path there should not be any duplicates, why?
        this.linkEntityGraph(root, entitiesByOperationIndex, context, false);
    }
    linkEntityGraph(currentEntities, entitiesByOperationIndex, context, checkForDuplicates = true) {
        for (const currentEntity of currentEntities) {
            const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(currentEntity);
            if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
                throw `Entity `;
            }
            const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId];
            let entityIsStub = context.ioc.entityStateManager.isStub(currentEntity);
            if (previouslyFoundEntity && entityIsStub) {
            }
            if (checkForDuplicates && entitiesByOperationIndex[operationUniqueId]) {
            }
        }
    }
}
//# sourceMappingURL=EntityGraphRestorer.js.map