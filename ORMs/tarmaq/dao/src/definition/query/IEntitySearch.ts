import { IContext } from '@airport/direction-indicator'
import { IEntitySelectProperties, RawEntityQuery } from '@airport/tarmaq-query'
import { Observable } from 'rxjs'
import { IEntityLookup } from './IEntityLookup'

/**
 * Entity 'searchOne' (searchOne many) API.
 */
export interface IEntitySearch<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>
	extends IEntityLookup {

	/**
	 * Returns an Observable of a list of fully interlinked entity graphs.
	 */
	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Observable<EntityArray>

	/**
	 * Returns an Observable for a list of non-interlinked entity trees.
	 */
	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		context?: IContext
	): Observable<EntityArray>

}
