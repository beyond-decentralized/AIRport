import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { IEntityContext } from '@airport/tarmaq-entity';
import {
	IAbstractQuery,
	RawNonEntityQuery,
	RawReadQuery
} from '@airport/tarmaq-query';

export interface ILookup {

	lookup(
		rawQuery: RawReadQuery | { (...args: any[]): RawReadQuery },
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
