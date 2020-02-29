import {DI}                   from '@airport/di'
import {QueryResultType}      from '@airport/ground-control'
import {
	IObservable,
	Observable
}                             from '@airport/observe'
import {LOOKUP}               from '../../../tokens'
import {IQOrderableField}     from '../../../lingo/core/field/Field'
import {INonEntitySearchOne}  from '../../../lingo/query/api/NonEntitySearchOne'
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

export class NonEntitySearchOne
	extends Lookup
	implements INonEntitySearchOne {

	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): IObservable<ITE> {
		return Observable.from(this.searchOne(
			rawTreeQuery, QueryResultType.TREE, TreeQuery))
	}

	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery }
	): IObservable<any[]> {
		return Observable.from(this.searchOne(
			rawSheetQuery, QueryResultType.SHEET, SheetQuery))
	}

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): IObservable<any> {
		return Observable.from(this.searchOne(
			rawFieldQuery, QueryResultType.FIELD, FieldQuery))
	}

	searchOne<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawNonEntityQuery | { (...args: any[]): RawNonEntityQuery },
		queryResultType: QueryResultType,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
	): Promise<IObservable<any[]>> {
		return this.lookup(rawNonEntityQuery, queryResultType,
			true, true, QueryClass)
	}

}
