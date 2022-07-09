import { Inject, Injected } from '@airport/direction-indicator'
import {
	JSONEntityRelation,
	JSONRelation
} from '@airport/ground-control'
import { IApplicationUtils, IQEntityDriver, IQEntityInternal, IRelationManager, IRelationManagerContext } from '@airport/tarmaq-query'

@Injected()
export class RelationManager
	implements IRelationManager {

	@Inject()
	applicationUtils: IApplicationUtils

	getPositionAlias(
		rootEntityPrefix: string,
		fromClausePosition: number[]
	): string {
		return `${rootEntityPrefix}_${fromClausePosition.join('_')}`
	}

	getAlias(
		jsonRelation: JSONRelation
	): string {
		return this.getPositionAlias(jsonRelation.rep, jsonRelation.fromClausePosition)
	}

	getParentAlias(
		jsonRelation: JSONRelation
	): string {
		let fromClausePosition = jsonRelation.fromClausePosition
		if (fromClausePosition.length === 0) {
			throw new Error(`Cannot find alias of a parent entity for the root entity`)
		}
		return this.getPositionAlias(jsonRelation.rep, fromClausePosition.slice(0, fromClausePosition.length - 1))
	}

	createRelatedQEntity<IQ extends IQEntityInternal>(
		joinRelation: JSONRelation,
		context: IRelationManagerContext,
	): IQ {
		const dbEntity = this.applicationUtils.getDbEntity(
			joinRelation.si, joinRelation.ti)
		let QEntityConstructor = this.applicationUtils.getQEntityConstructor(
			dbEntity)
		return new QEntityConstructor(
			dbEntity,
			this.applicationUtils,
			this,
			joinRelation.fromClausePosition,
			dbEntity.relations[(<JSONEntityRelation>joinRelation).ri],
			joinRelation.jt)
	}

	getNextChildJoinPosition(
		joinParentDriver: IQEntityDriver
	): number[] {
		let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice()
		nextChildJoinPosition.push(++joinParentDriver.currentChildIndex)

		return nextChildJoinPosition
	}

}
