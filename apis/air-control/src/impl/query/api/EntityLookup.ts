import {
	DbEntity,
	QueryResultType
}                                from '@airport/ground-control'
import {IEntityContext}          from '../../../lingo/core/EntityContext'
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
		context: IEntityContext
	): Promise<any>

	setMap(
		MappedChildClass: new (
			dbEntity: DbEntity,
			mapResults: boolean
		) => MappedChild,
		isMapped: boolean
	): MappedChild

	setNoCache(
		ChildClass: new (
			dbEntity: DbEntity,
			mapResults: boolean
		) => Child
	): Child

}

export abstract class EntityLookup<Child, MappedChild,
	IESP extends IEntitySelectProperties>
	extends LookupProxy
	implements IEntityLookupInternal<Child, MappedChild, IESP> {

	static mapResults     = false

	constructor(
		protected dbEntity: DbEntity,
		protected mapResults     = EntityLookup.mapResults
	) {
		super()
	}

	abstract map(
		isMapped?: boolean
	): MappedChild

	setMap(
		MappedChildClass: new (
			dbEntity: DbEntity,
			mapResults: boolean
		) => MappedChild,
		isMapped = true
	): MappedChild {
		return new MappedChildClass(
			this.dbEntity, isMapped)
	}

	setNoCache(
		ChildClass: new (
			dbEntity: DbEntity,
			mapResults: boolean
		) => Child
	): Child {
		return new ChildClass(
			this.dbEntity, this.mapResults)
	}

	entityLookup(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		context: IEntityContext
	): Promise<any> {
		context.dbEntity = this.dbEntity
		const result = this.lookup(rawEntityQuery, queryResultType,
			search, one, null, context, this.mapResults)
			DB_UPDATE_CACHE_MANAGER
		if(search) {

		} else {

		}
	}

}
