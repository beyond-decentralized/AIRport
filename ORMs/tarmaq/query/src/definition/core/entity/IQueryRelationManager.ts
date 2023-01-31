import {
	QueryRelation
} from '@airport/ground-control'
import { IQEntityDriver, IQEntityInternal } from './IQEntityDriver'

export interface IQueryRelationManager {

	getPositionAlias(
		rootEntityPrefix: string,
		fromClausePosition: number[]
	): string

	getAlias(
		queryRelation: QueryRelation
	): string

	getParentAlias(
		queryRelation: QueryRelation
	): string

	createRelatedQEntity<IQ extends IQEntityInternal>(
		joinRelation: QueryRelation,
		context: IQueryRelationManagerContext,
	): IQ

	getNextChildJoinPosition(
		joinParentDriver: IQEntityDriver
	): number[]

}

export interface IQueryRelationManagerContext {
}
