import { IContext, Injected } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { DistinguishableQuery, FieldQuery, IQOrderableField, IQueryContext, ITreeEntity, RawNonEntityQuery, RawOneTimeFieldQuery, RawOneTimeNonEntityQuery, RawOneTimeSheetQuery, RawOneTimeTreeQuery, SheetQuery, TreeQuery } from '@airport/tarmaq-query';
import { INonEntityFind } from '../../definition/query/INonEntityFind';
import { Lookup } from './Lookup';

/**
 * Created by Papa on 11/12/2016.
 */
@Injected()
export class NonEntityFind
	extends Lookup
	implements INonEntityFind {

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawOneTimeFieldQuery<IQF>
			| { (...args: any[]): RawOneTimeFieldQuery<any> },
		context?: IContext
	): Promise<any[]> {
		return this.find(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context);
	}

	sheet(
		rawSheetQuery: RawOneTimeSheetQuery
			| { (...args: any[]): RawOneTimeSheetQuery },
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
		rawTreeQuery: RawOneTimeTreeQuery<ITE>
			| { (...args: any[]): RawOneTimeTreeQuery<any> },
		context?: IContext
	): Promise<ITE[]> {
		return this.find(rawTreeQuery, QueryResultType.TREE, TreeQuery, context);
	}

	find<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawOneTimeNonEntityQuery
			| { (...args: any[]): RawOneTimeNonEntityQuery },
		queryResultType: QueryResultType,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
		context: IContext
	): Promise<any[]> {
		return this.lookup(rawNonEntityQuery, queryResultType,
			false, false, QueryClass,
			this.ensureContext(context as IQueryContext));
	}

}
