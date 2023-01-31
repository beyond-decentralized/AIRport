import {
	JSONRelation
} from '@airport/ground-control'
import { IQEntityDriver, IQEntityInternal } from './IQEntityDriver'

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

	createRelatedQEntity<IQ extends IQEntityInternal>(
		joinRelation: JSONRelation,
		context: IRelationManagerContext,
	): IQ

	getNextChildJoinPosition(
		joinParentDriver: IQEntityDriver
	): number[]

}

export interface IRelationManagerContext {
}
