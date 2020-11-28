import {
	ENTITY_STATE_MANAGER,
	IEntityStateManager
}           from '@airport/air-control'
import {DI} from '@airport/di'

export interface IEntityGraphRestore {

}

export class EntityGraphRestorer
	implements IEntityGraphRestore {

	restoreEntityGraph(
		root
	) {
		if (!(root instanceof Array)) {
			root = [root]
		}
		const entityStateManager = DI.db().getSync(ENTITY_STATE_MANAGER)
		const entitiesByOperationIndex = []
		this.linkEntityGraph(root, entitiesByOperationIndex, entityStateManager)
		this.linkEntityGraph(root, entitiesByOperationIndex, entityStateManager, false)
	}

	protected linkEntityGraph(
		currentEntities: any[],
		entitiesByOperationIndex: any[],
		entityStateManager: IEntityStateManager,
		checkForDuplicates: boolean = true
	) {
		for (const currentEntity of currentEntities) {
			const operationUniqueId     = entityStateManager.getOperationUniqueId(currentEntity)
			const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId]
			let entityIsStub            = entityStateManager.isStub(currentEntity)

			if (previouslyFoundEntity && entityIsStub) {

			}

			if (checkForDuplicates && entitiesByOperationIndex[operationUniqueId]) {

			}

		}
	}
}
