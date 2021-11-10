import { IContext }             from '@airport/di';
import { QueryResultType }      from '@airport/ground-control';
import { IQOrderableField }     from '../../../lingo/core/field/Field';
import { INonEntityFindOne }    from '../../../lingo/query/api/NonEntityFindOne';
import { RawFieldQuery }        from '../../../lingo/query/facade/FieldQuery';
import { RawNonEntityQuery }    from '../../../lingo/query/facade/NonEntityQuery';
import { RawSheetQuery }        from '../../../lingo/query/facade/SheetQuery';
import {
	ITreeEntity,
	RawTreeQuery
}                               from '../../../lingo/query/facade/TreeQuery';
import { IQueryContext }        from '../../../lingo/query/QueryContext';
import { FieldQuery }           from '../facade/FieldQuery';
import { DistinguishableQuery } from '../facade/NonEntityQuery';
import { SheetQuery }           from '../facade/SheetQuery';
import { TreeQuery }            from '../facade/TreeQuery';
import { Lookup }               from './Lookup';

/**
 * Created by Papa on 11/12/2016.
 */

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
