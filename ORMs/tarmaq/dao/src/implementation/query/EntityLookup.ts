import { IOC } from '@airport/direction-indicator'
import {
	DbEntity,
	QueryResultType
} from '@airport/ground-control'
import { IEntityContext } from '@airport/tarmaq-entity'
import {
	ENTITY_UTILS,
	IEntityQueryContext,
	IEntitySelectProperties,
	RawEntityQuery
} from '@airport/tarmaq-query'
import { map, Observable } from 'rxjs'
import { IDao } from '../../definition/IDao'
import { IEntityLookup } from '../../definition/query/IEntityLookup'
import { LookupProxy } from './Lookup'

export interface IEntityLookupInternal<Child,
	IESP extends IEntitySelectProperties>
	extends IEntityLookup {

	entityFind(
		rawEntityQuery: RawEntityQuery<IESP>
			| { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		one: boolean,
		context: IEntityContext
	): Promise<any>

	entitySearch(
		rawEntityQuery: RawEntityQuery<IESP>
			| { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		one: boolean,
		context: IEntityContext
	): Observable<any>

	setNoCache(
		ChildClass: new (
			dbEntity: DbEntity,
			dao: IDao<any, any, any, any, any, any, any, any>,
			mapResults: boolean
		) => Child
	): Child

}

export abstract class EntityLookup<Child,
	IESP extends IEntitySelectProperties>
	extends LookupProxy
	implements IEntityLookupInternal<Child, IESP> {

	static mapResults = false

	constructor(
		protected dbEntity: DbEntity,
		dao: IDao<any, any, any, any, any, any, any, any>,
		protected mapResults = EntityLookup.mapResults,
	) {
		super(dao)
	}

	setNoCache(
		ChildClass: new (
			dbEntity: DbEntity,
			dao: IDao<any, any, any, any, any, any, any, any>,
			mapResults: boolean
		) => Child
	): Child {
		return new ChildClass(this.dbEntity, this.dao, this.mapResults)
	}

	async entityFind(
		rawEntityQuery: RawEntityQuery<IESP>
			| { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		one: boolean,
		context: IEntityQueryContext
	): Promise<any> {
		context.dbEntity = this.dbEntity

		rawEntityQuery = IOC.getSync(ENTITY_UTILS)
			.ensureId(rawEntityQuery)

		let result = await this.findInternal(rawEntityQuery, queryResultType,
			one, null, context, this.mapResults)

		this.dao.updateCacheManager.saveOriginalValues(result, context.dbEntity)

		return result
	}

	entitySearch(
		rawEntityQuery: RawEntityQuery<IESP>
			| { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		one: boolean,
		context: IEntityQueryContext
	): Observable<any> {
		context.dbEntity = this.dbEntity

		rawEntityQuery = IOC.getSync(ENTITY_UTILS)
			.ensureId(rawEntityQuery)

		let result = this.searchInternal(rawEntityQuery, queryResultType,
			one, null, context, this.mapResults)

		result = result.pipe(
			map(observedResult => {
				this.dao.updateCacheManager.saveOriginalValues(result, context.dbEntity)

				return observedResult
			})
		)

		return result
	}

}
