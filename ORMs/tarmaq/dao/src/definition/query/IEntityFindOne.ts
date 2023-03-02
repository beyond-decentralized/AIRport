import { IContext } from '@airport/direction-indicator'
import { IEntitySelectProperties, RawOneTimeEntityQuery } from '@airport/tarmaq-query';
import { IEntityLookup } from './IEntityLookup'

/**
 * Entity 'findOne' API.
 */
export interface IEntityFindOne<Entity, IESP extends IEntitySelectProperties>
	extends IEntityLookup {

	/**
	 * Returns a Promise for a fully interlinked entity graph.
	 */
	graph(
		rawGraphQuery: RawOneTimeEntityQuery<IESP>
			| { (...args: any[]): RawOneTimeEntityQuery<IESP> },
		context?: IContext
	): Promise<Entity>;

	/**
	 * Returns a Promise for a non-interlinked entity tree.
	 */
	tree(
		rawTreeQuery: RawOneTimeEntityQuery<IESP>
			| { (...args: any[]): RawOneTimeEntityQuery<IESP> },
		context?: IContext
	): Promise<Entity>;

}
