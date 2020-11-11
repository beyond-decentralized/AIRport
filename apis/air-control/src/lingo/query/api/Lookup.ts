import {QueryResultType}   from '@airport/ground-control'
import {IEntityContext,}   from '../../core/data/EntityContext'
import {UpdateCacheType}   from '../../core/data/UpdateCacheType'
import {IAbstractQuery}    from '../facade/AbstractQuery'
import {RawNonEntityQuery} from '../facade/NonEntityQuery'
import {RawQuery}          from '../facade/Query'

export interface ILookup {

	lookup(
		rawQuery: RawQuery | { (...args: any[]): RawQuery },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => IAbstractQuery,
		ctx: IEntityContext,
		cacheForUpdate?: UpdateCacheType,
		mapResults?: boolean
	): Promise<any>

}
