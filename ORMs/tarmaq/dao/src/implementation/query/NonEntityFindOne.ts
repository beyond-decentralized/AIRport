import { IContext, Injected } from '@airport/direction-indicator';
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
import { INonEntityFindOne } from '../../definition/query/INonEntityFindOne';
import { Lookup } from './Lookup';

/**
 * Created by Papa on 11/12/2016.
 */
@Injected()
export class NonEntityFindOne
	extends Lookup
	implements INonEntityFindOne {

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		context?: IContext
	): Promise<any[]> {
		return this.findOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context);
	}

	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		context?: IContext
	): Promise<any> {
		return this.findOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context);
	}

	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> },
		context?: IContext
	): Promise<ITE> {
		return this.findOne(rawTreeQuery, QueryResultType.TREE, TreeQuery, context);
	}

	findOne<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawNonEntityQuery | { (...args: any[]): RawNonEntityQuery },
		queryResultType: QueryResultType,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
		context: IContext
	): Promise<any> {
		return this.lookup(rawNonEntityQuery, queryResultType,
			false, true, QueryClass,
			this.ensureContext(context as IQueryContext));
	}

}
