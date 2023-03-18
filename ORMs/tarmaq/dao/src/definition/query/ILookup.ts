import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { IEntityContext } from '@airport/tarmaq-entity';
import {
	IAbstractQuery,
	RawNonEntityQuery,
	RawReadQuery
} from '@airport/tarmaq-query';
import { Observable } from 'rxjs';

export interface ILookup {

	findInternal(
		rawQuery: RawReadQuery | { (...args: any[]): RawReadQuery },
		queryResultType: QueryResultType,
		one: boolean,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => IAbstractQuery,
		context: IEntityContext,
		mapResults?: boolean
	): Promise<any>

	searchInternal(
		rawQuery: RawReadQuery | { (...args: any[]): RawReadQuery },
		queryResultType: QueryResultType,
		one: boolean,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => IAbstractQuery,
		context: IEntityContext,
		mapResults?: boolean
	): Observable<any>

	ensureContext<C extends IContext = IContext>(
		context?: C
	): C

}
