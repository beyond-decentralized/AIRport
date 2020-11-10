import {
	DbEntity,
	QueryResultType
}                        from '@airport/ground-control'
import {
	IEntityContext,
	IEntityOperationContext
}                        from '../../../lingo/core/data/EntityContext'
import {UpdateCacheType} from '../../../lingo/core/data/UpdateCacheType'
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
		one: boolean,
		ctx: IEntityContext
	): Promise<any>

	setMap(
		MappedChildClass: new (
			dbEntity: DbEntity,
			cacheForUpdate: UpdateCacheType,
			mapResults: boolean
		) => MappedChild,
		isMapped: boolean
	): MappedChild

	setNoCache(
		ChildClass: new (
			dbEntity: DbEntity,
			cacheForUpdate: UpdateCacheType,
			mapResults: boolean
		) => Child
	): Child

	setCache(
		ChildClass: new (
			dbEntity: DbEntity,
			cacheForUpdate: UpdateCacheType,
			mapResults: boolean
		) => Child,
		cacheForUpdate: UpdateCacheType
	): Child

}

export abstract class EntityLookup<Child, MappedChild,
	IESP extends IEntitySelectProperties>
	extends LookupProxy
	implements IEntityLookupInternal<Child, MappedChild, IESP> {

	static cacheForUpdate = UpdateCacheType.NONE
	static mapResults     = false


	constructor(
		protected dbEntity: DbEntity,
		protected cacheForUpdate = EntityLookup.cacheForUpdate,
		protected mapResults     = EntityLookup.mapResults
	) {
		super()
	}

	abstract map(
		isMapped?: boolean
	): MappedChild


	abstract noCache(): Child

	abstract cache(
		cacheForUpdate?: UpdateCacheType
	): Child

	setMap(
		MappedChildClass: new (
			dbEntity: DbEntity,
			cacheForUpdate: UpdateCacheType,
			mapResults: boolean
		) => MappedChild,
		isMapped = true
	): MappedChild {
		return new MappedChildClass(
			this.dbEntity, this.cacheForUpdate, isMapped)
	}

	setNoCache(
		ChildClass: new (
			dbEntity: DbEntity,
			cacheForUpdate: UpdateCacheType,
			mapResults: boolean
		) => Child
	): Child {
		return new ChildClass(
			this.dbEntity, UpdateCacheType.NONE, this.mapResults)
	}

	setCache(
		ChildClass: new (
			dbEntity: DbEntity,
			cacheForUpdate: UpdateCacheType,
			mapResults: boolean
		) => Child,
		cacheForUpdate: UpdateCacheType = UpdateCacheType.ALL_QUERY_ENTITIES
	): Child {
		return new ChildClass(
			this.dbEntity, cacheForUpdate, this.mapResults)
	}

	entityLookup(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		ctx: IEntityContext
	): Promise<any> {
		ctx.dbEntity = this.dbEntity
		return this.lookup(rawEntityQuery, queryResultType,
			search, one, null,
			ctx as IEntityOperationContext, this.cacheForUpdate, this.mapResults)
	}

	/*
		protected cleanNextCallState(): UpdateCacheType {
			const saveCurrentCallInUpdateCache = this.saveNextCallInUpdateCache
			this.saveNextCallInUpdateCache     = UpdateCacheType.NONE

			return saveCurrentCallInUpdateCache
		}*/

}
