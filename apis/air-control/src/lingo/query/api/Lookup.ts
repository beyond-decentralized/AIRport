import {
	DbEntity,
	QueryResultType
}                          from '@airport/ground-control'
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
		dbEntity?: DbEntity,
		cacheForUpdate?: UpdateCacheType,
		mapResults?: boolean
	): Promise<any>

}
