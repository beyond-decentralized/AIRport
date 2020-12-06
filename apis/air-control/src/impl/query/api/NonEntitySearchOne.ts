import {IContext}             from '@airport/di'
import {QueryResultType}      from '@airport/ground-control'
import {
	IObservable,
	Observable
}                             from '@airport/observe'
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
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> },
		context?: IContext
	): IObservable<ITE> {
		return Observable.from(this.searchOne(
			rawTreeQuery, QueryResultType.TREE, TreeQuery, context))
	}

	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		context?: IContext
	): IObservable<any[]> {
		return Observable.from(this.searchOne(
			rawSheetQuery, QueryResultType.SHEET, SheetQuery, context))
	}

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		context?: IContext
	): IObservable<any> {
		return Observable.from(this.searchOne(
			rawFieldQuery, QueryResultType.FIELD, FieldQuery, context))
	}

	searchOne<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawNonEntityQuery | { (...args: any[]): RawNonEntityQuery },
		queryResultType: QueryResultType,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
		context: IContext
	): Promise<IObservable<any[]>> {
		return this.lookup(rawNonEntityQuery, queryResultType,
			true, true, QueryClass, this.ensureContext(context))
	}

}
