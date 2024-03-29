import { Inject, Injected } from '@airport/direction-indicator'
import {
	IApplicationUtils,
	QueryEntityRelation,
	QueryRelation
} from '@airport/ground-control'
import { IQEntityDriver, IQEntityInternal, IQueryUtils, IQueryRelationManager, IQueryRelationManagerContext } from '@airport/tarmaq-query'

@Injected()
export class QueryRelationManager
	implements IQueryRelationManager {

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	queryUtils: IQueryUtils

	getPositionAlias(
		rootEntityPrefix: string,
		fromClausePosition: number[]
	): string {
		return `${rootEntityPrefix}_${fromClausePosition.join('_')}`
	}

	getAlias(
		queryRelation: QueryRelation
	): string {
		return this.getPositionAlias(queryRelation.rootEntityPrefix, queryRelation.fromClausePosition)
	}

	getParentAlias(
		queryRelation: QueryRelation
	): string {
		let fromClausePosition = queryRelation.fromClausePosition
		if (fromClausePosition.length === 0) {
			throw new Error(`Cannot find alias of a parent entity for the root entity`)
		}
		return this.getPositionAlias(queryRelation.rootEntityPrefix, fromClausePosition.slice(0, fromClausePosition.length - 1))
	}

	createRelatedQEntity<IQ extends IQEntityInternal>(
		joinRelation: QueryRelation,
		context: IQueryRelationManagerContext,
	): IQ {
		const dbEntity = this.applicationUtils.getDbEntity(
			joinRelation.applicationIndex, joinRelation.entityIndex)
		let QEntityConstructor = this.queryUtils.getQEntityConstructor<IQ>(
			dbEntity)
		return new QEntityConstructor(
			dbEntity,
			this.queryUtils,
			this,
			joinRelation.fromClausePosition,
			dbEntity.relations[(<QueryEntityRelation>joinRelation).relationIndex],
			joinRelation.joinType)
	}

	getNextChildJoinPosition(
		joinParentDriver: IQEntityDriver
	): number[] {
		let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice()
		nextChildJoinPosition.push(++joinParentDriver.currentChildIndex)

		return nextChildJoinPosition
	}

}
