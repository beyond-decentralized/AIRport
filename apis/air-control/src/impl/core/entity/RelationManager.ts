import {DI}               from '@airport/di'
import {
	JSONEntityRelation,
	JSONRelation
}                         from '@airport/ground-control'
import {IAirportDatabase} from '../../../lingo/AirportDatabase'
import {
	IQEntityDriver,
	IQEntityInternal
}                         from '../../../lingo/core/entity/Entity'
import {IApplicationUtils}     from '../../../lingo/utils/ApplicationUtils'
import {RELATION_MANAGER} from '../../../tokens'

export interface IRelationManager {

	getPositionAlias(
		rootEntityPrefix: string,
		fromClausePosition: number[]
	): string

	getAlias(
		jsonRelation: JSONRelation
	): string

	getParentAlias(
		jsonRelation: JSONRelation
	): string

	createRelatedQEntity<IQ extends IQEntityInternal<any>>(
		joinRelation: JSONRelation,
		context: IRelationManagerContext,
	): IQ

	getNextChildJoinPosition(
		joinParentDriver: IQEntityDriver<any>
	): number[]

}

export interface IRelationManagerContext {
	ioc: {
		airDb: IAirportDatabase
		applicationUtils: IApplicationUtils
	}
}

export class RelationManager
	implements IRelationManager {

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

	createRelatedQEntity<IQ extends IQEntityInternal<any>>(
		joinRelation: JSONRelation,
		context: IRelationManagerContext,
	): IQ {
		const dbEntity         = context.ioc.applicationUtils.getDbEntity(
			joinRelation.si, joinRelation.ti, context.ioc.airDb)
		let QEntityConstructor = context.ioc.applicationUtils.getQEntityConstructor(
			dbEntity, context.ioc.airDb)
		return new QEntityConstructor<IQ>(
			dbEntity,
			joinRelation.fromClausePosition,
			dbEntity.relations[(<JSONEntityRelation>joinRelation).ri],
			joinRelation.jt)
	}

	getNextChildJoinPosition(
		joinParentDriver: IQEntityDriver<any>
	): number[] {
		let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice()
		nextChildJoinPosition.push(++joinParentDriver.currentChildIndex)

		return nextChildJoinPosition
	}

}

DI.set(RELATION_MANAGER, RelationManager)
