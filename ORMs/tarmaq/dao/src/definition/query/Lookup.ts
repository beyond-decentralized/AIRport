import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import {
	IAbstractQuery,
	IEntityContext,
	RawNonEntityQuery,
	RawQuery
} from '@airport/tarmaq-query';

export interface ILookup {

	lookup(
		rawQuery: RawQuery | { (...args: any[]): RawQuery },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => IAbstractQuery,
		ctx: IEntityContext,
		mapResults?: boolean
	): Promise<any>

	ensureContext<C extends IContext = IContext>(
		context?: C
	): C

}
