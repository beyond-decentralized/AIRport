import {
	getOperationUniqueId,
	isStub
} from '@airport/air-control'

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
		const entitiesByOperationIndex = []
		this.linkEntityGraph(root, entitiesByOperationIndex)
		this.linkEntityGraph(root, entitiesByOperationIndex, false)
	}

	protected linkEntityGraph(
		currentEntities: any[],
		entitiesByOperationIndex: any[],
		checkForDuplicates: boolean = true
	) {
		for (const currentEntity of currentEntities) {
			const operationUniqueId     = getOperationUniqueId(currentEntity)
			const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId]
			let entityIsStub            = isStub(currentEntity)

			if (previouslyFoundEntity && entityIsStub) {

			}

			if (checkForDuplicates && entitiesByOperationIndex[operationUniqueId]) {

			}

		}
	}
}
