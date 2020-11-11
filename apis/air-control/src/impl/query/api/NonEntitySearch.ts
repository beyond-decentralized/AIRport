import {IContext}             from '@airport/di'
import {QueryResultType}      from '@airport/ground-control'
import {
	IObservable,
	Observable
}                             from '@airport/observe'
import {IQOrderableField}     from '../../../lingo/core/field/Field'
import {INonEntitySearch}     from '../../../lingo/query/api/NonEntitySearch'
import {RawFieldQuery}        from '../../../lingo/query/facade/FieldQuery'
import {RawNonEntityQuery}    from '../../../lingo/query/facade/NonEntityQuery'
import {RawSheetQuery}        from '../../../lingo/query/facade/SheetQuery'
import {
	ITreeEntity,
	RawTreeQuery
}                             from '../../../lingo/query/facade/TreeQuery'
import {FieldQuery}           from '../facade/FieldQuery'
import {DistinguishableQuery} from '../facade/NonEntityQuery'
import {SheetQuery}           from '../facade/SheetQuery'
import {TreeQuery}            from '../facade/TreeQuery'
import {Lookup}               from './Lookup'

/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntitySearch
	extends Lookup
	implements INonEntitySearch {

	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> },
		ctx?: IContext
	): IObservable<ITE[]> {
		return Observable.from(this.search(
			rawTreeQuery, QueryResultType.TREE, TreeQuery, ctx))
	}

	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		ctx?: IContext
	): IObservable<any[][]> {
		return Observable.from(this.search(
			rawSheetQuery, QueryResultType.SHEET, SheetQuery, ctx))
	}

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		ctx?: IContext
	): IObservable<any[]> {
		return Observable.from(this.search(
			rawFieldQuery, QueryResultType.FIELD, FieldQuery, ctx))
	}

	search<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawNonEntityQuery | { (...args: any[]): RawNonEntityQuery },
		queryResultType: QueryResultType,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
		ctx: IContext
	): Promise<IObservable<any[]>> {
		return this.lookup(rawNonEntityQuery, queryResultType,
			true, false, QueryClass, this.ensureContext(ctx))
	}

}
