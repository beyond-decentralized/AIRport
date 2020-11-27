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
import {ISchemaUtils}     from '../../../lingo/utils/SchemaUtils'
import {RELATION_MANAGER} from '../../../tokens'

export interface IRelationManager {

}

export interface IRelationManagerContext {
	ioc: {
		airDb: IAirportDatabase
		schemaUtils: ISchemaUtils
	}
}

export class RelationManager
	implements IRelationManager {

	getPositionAlias(
		rootEntityPrefix: string,
		fromClausePosition: number[]
	) {
		return `${rootEntityPrefix}_${fromClausePosition.join('_')}`
	}

	getAlias(
		jsonRelation: JSONRelation
	): string {
		return this.getPositionAlias(jsonRelation.rep, jsonRelation.fcp)
	}

	getParentAlias(
		jsonRelation: JSONRelation
	): string {
		let fromClausePosition = jsonRelation.fcp
		if (fromClausePosition.length === 0) {
			throw new Error(`Cannot find alias of a parent entity for the root entity`)
		}
		return this.getPositionAlias(jsonRelation.rep, fromClausePosition.slice(0, fromClausePosition.length - 1))
	}

	createRelatedQEntity<IQ extends IQEntityInternal>(
		joinRelation: JSONRelation,
		context: IRelationManagerContext,
	): IQ {
		const dbEntity         = context.ioc.schemaUtils.getDbEntity(
			joinRelation.si, joinRelation.ti, context.ioc.airDb)
		let QEntityConstructor = context.ioc.schemaUtils.getQEntityConstructor(
			dbEntity, context.ioc.airDb)
		return new QEntityConstructor<IQ>(
			dbEntity,
			joinRelation.fcp,
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

DI.set(RELATION_MANAGER, RelationManager)
