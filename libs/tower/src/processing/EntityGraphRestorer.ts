import {IOperationContext} from './OperationContext'

export interface IEntityGraphRestorer {

	restoreEntityGraph<T>(
		root: T | T[],
		context: IOperationContext<any, any>
	): void

}

export class EntityGraphRestorer
	implements IEntityGraphRestorer {

	restoreEntityGraph<T>(
		root: T | T[],
		context: IOperationContext<any, any>
	): void {
		if (!(root instanceof Array)) {
			root = [root]
		}
		const entitiesByOperationIndex = []
		this.linkEntityGraph(root, entitiesByOperationIndex, context)
		// On the second path there should not be any duplicates, why?
		this.linkEntityGraph(root, entitiesByOperationIndex, context, false)
	}

	protected linkEntityGraph(
		currentEntities: any[],
		entitiesByOperationIndex: any[],
		context: IOperationContext<any, any>,
		checkForDuplicates: boolean = true
	) {
		for (const currentEntity of currentEntities) {
			const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(currentEntity)
			if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
				throw `Entity `
			}
			const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId]
			let entityIsStub            = context.ioc.entityStateManager.isStub(currentEntity)

			if (previouslyFoundEntity && entityIsStub) {
			}

			if (checkForDuplicates && entitiesByOperationIndex[operationUniqueId]) {
			}
		}
	}
}
