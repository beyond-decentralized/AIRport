import {
	IContext,
	Injected
} from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import {
	DistinguishableQuery,
	FieldQuery,
	IQOrderableField,
	IQueryContext,
	ITreeEntity,
	RawFieldQuery,
	RawNonEntityQuery,
	RawSheetQuery,
	RawTreeQuery,
	SheetQuery,
	TreeQuery
} from '@airport/tarmaq-query';
import {
	Observable,
	from
} from 'rxjs';
import { INonEntitySearch } from '../../definition/query/INonEntitySearch';
import { Lookup } from './Lookup';

/**
 * Created by Papa on 11/12/2016.
 */

@Injected()
export class NonEntitySearch
	extends Lookup
	implements INonEntitySearch {

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		context?: IContext
	): Observable<any[]> {
		return this.search(
			rawFieldQuery, QueryResultType.FIELD, FieldQuery, context);
	}

	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		context?: IContext
	): Observable<any[][]> {
		return this.search(
			rawSheetQuery, QueryResultType.SHEET, SheetQuery, context);
	}

	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> },
		context?: IContext
	): Observable<ITE[]> {
		return this.search(
			rawTreeQuery, QueryResultType.TREE, TreeQuery, context);
	}

	search<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawNonEntityQuery | { (...args: any[]): RawNonEntityQuery },
		queryResultType: QueryResultType,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
		context: IContext
	): Observable<any[]> {
		return this.searchInternal(rawNonEntityQuery, queryResultType,
			false, QueryClass,
			this.ensureContext(context as IQueryContext));
	}

}
