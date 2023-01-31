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
import { IDao } from '../../definition/IDao'
import { IEntityLookup } from '../../definition/query/IEntityLookup'
import { LookupProxy } from './Lookup'

export interface IEntityLookupInternal<Child,
	IESP extends IEntitySelectProperties>
	extends IEntityLookup {

	entityLookup(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		context: IEntityContext
	): Promise<any>

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

	async entityLookup(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		context: IEntityQueryContext
	): Promise<any> {
		context.dbEntity = this.dbEntity

		rawEntityQuery = IOC.getSync(ENTITY_UTILS)
			.ensureId(rawEntityQuery)

		const result = await this.lookup(rawEntityQuery, queryResultType,
			search, one, null, context, this.mapResults)
		if (search) {
			throw new Error(`Search operations are not yet supported`);
		} else {
			this.dao.updateCacheManager.saveOriginalValues(result, context.dbEntity)
		}
		return result
	}

}
