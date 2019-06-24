import {IEntitySelectProperties} from '../../core/entity/Entity'
import {RawEntityQuery}          from '../facade/EntityQuery'
import {MappedEntityArray}       from '../MappedEntityArray'
import {IEntityLookup}           from './EntityLookup'

/**
 * Entity 'find' (find many) API.
 */
export interface IEntityFind<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>
	extends IEntityLookup<IEntityFind<Entity, Array<Entity>, IESP>, IEntityFind<Entity, MappedEntityArray<Entity>, IESP>> {

	/**
	 * Returns a Promise for a list of fully interlinked entity graphs.
	 */
	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<EntityArray>;

	/**
	 * Returns a Promise for a list of non-interlinked entity trees.
	 */
	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<EntityArray>;

}
