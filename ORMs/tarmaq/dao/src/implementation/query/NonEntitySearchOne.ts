import {
	IContext, Injected
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
import { INonEntitySearchOne } from '../../definition/query/NonEntitySearchOne';
import { Lookup } from './Lookup';

/**
 * Created by Papa on 11/12/2016.
 */
@Injected()
export class NonEntitySearchOne
	extends Lookup
	implements INonEntitySearchOne {

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		context?: IContext
	): Observable<any> {
		return from(this.searchOne(
			rawFieldQuery, QueryResultType.FIELD, FieldQuery, context));
	}

	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		context?: IContext
	): Observable<any[]> {
		return from(this.searchOne(
			rawSheetQuery, QueryResultType.SHEET, SheetQuery, context));
	}

	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> },
		context?: IContext
	): Observable<ITE> {
		return from(this.searchOne(
			rawTreeQuery, QueryResultType.TREE, TreeQuery, context));
	}

	searchOne<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawNonEntityQuery | { (...args: any[]): RawNonEntityQuery },
		queryResultType: QueryResultType,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
		context: IContext
	): Promise<any> {
		return this.lookup(rawNonEntityQuery, queryResultType,
			true, true, QueryClass,
			this.ensureContext(context as IQueryContext));
	}

}
