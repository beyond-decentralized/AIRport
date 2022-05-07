import { IContext, Injected }             from '@airport/direction-indicator';
import { QueryResultType }      from '@airport/ground-control';
import { IQOrderableField }     from '../../../lingo/core/field/Field';
import { INonEntityFind }       from '../../../lingo/query/api/NonEntityFind';
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
@Injected()
export class NonEntityFind
	extends Lookup
	implements INonEntityFind {

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		context?: IContext
	): Promise<any[]> {
		return this.find(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context);
	}

	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void,
		context?: IContext
	): Promise<any[][]> {
		if (cursorSize || callback) {
			throw new Error(`Implement!`);
		}

		return this.find(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context);
	}

	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> },
		context?: IContext
	): Promise<ITE[]> {
		return this.find(rawTreeQuery, QueryResultType.TREE, TreeQuery, context);
	}

	find<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawNonEntityQuery | { (...args: any[]): RawNonEntityQuery },
		queryResultType: QueryResultType,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
		context: IContext
	): Promise<any[]> {
		return this.lookup(rawNonEntityQuery, queryResultType,
			false, false, QueryClass,
			this.ensureContext(context as IQueryContext));
	}

}