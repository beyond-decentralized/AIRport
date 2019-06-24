import {
	DbEntity,
	QueryResultType
}                                from '@airport/ground-control'
import {UpdateCacheType}         from '../../../lingo/core/data/UpdateCacheType'
import {IEntitySelectProperties} from '../../../lingo/core/entity/Entity'
import {IEntityLookup}           from '../../../lingo/query/api/EntityLookup'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {LookupProxy}             from './Lookup'

export interface IEntityLookupInternal<Child, MappedChild,
	IESP extends IEntitySelectProperties>
	extends IEntityLookup<Child, MappedChild> {

	entityLookup(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean
	): Promise<any>

}

export abstract class EntityLookup<Child, MappedChild,
	IESP extends IEntitySelectProperties>
	extends LookupProxy
	implements IEntityLookupInternal<Child, MappedChild, IESP> {

	static cacheForUpdate = UpdateCacheType.NONE
	static mapResults     = false

	protected mapResults     = EntityLookup.mapResults
	protected cacheForUpdate = EntityLookup.cacheForUpdate

	constructor(
		protected dbEntity: DbEntity
	) {
		super()
	}

	map(
		isMapped?: boolean
	): MappedChild {
		this.mapResults = true

		return <any>this
	}

	noCache(): Child {
		this.cache(UpdateCacheType.NONE)

		return <Child><any>this
	}

	cache(
		cacheForUpdate: UpdateCacheType = UpdateCacheType.ROOT_QUERY_ENTITIES
	): Child {
		this.cacheForUpdate = cacheForUpdate

		return <Child><any>this
	}

	entityLookup(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean
	): Promise<any> {
		return this.lookup(rawEntityQuery, queryResultType,
			search, one, null,
			this.dbEntity, this.cacheForUpdate, this.mapResults)
	}

	/*
		protected cleanNextCallState(): UpdateCacheType {
			const saveCurrentCallInUpdateCache = this.saveNextCallInUpdateCache
			this.saveNextCallInUpdateCache     = UpdateCacheType.NONE

			return saveCurrentCallInUpdateCache
		}*/

}
