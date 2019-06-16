import {DI}                   from '@airport/di'
import {QueryResultType}      from '@airport/ground-control'
import {
	IObservable,
	Observable
}                             from '@airport/observe'
import {
	ENTITY_MANAGER,
	ENTITY_UTILS
} from '../../../diTokens'
import {IQOrderableField}     from '../../../lingo/core/field/Field'
import {IDatabaseFacade}      from '../../../lingo/core/repository/DatabaseFacade'
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

/**
 * Created by Papa on 11/12/2016.
 */

export class NonEntitySearch
	implements INonEntitySearch {

	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): IObservable<ITE[]> {
		return Observable.from(this.doSearch(
			rawTreeQuery, TreeQuery, QueryResultType.TREE))
	}

	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery }
	): IObservable<any[][]> {
		return Observable.from(this.doSearch(
			rawSheetQuery, SheetQuery, QueryResultType.SHEET))
	}

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): IObservable<any[]> {
		return Observable.from(this.doSearch(
			rawFieldQuery, FieldQuery, QueryResultType.FIELD))
	}

	private async doSearch<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawNonEntityQuery | { (...args: any[]): RawNonEntityQuery },
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
		queryResultType: QueryResultType
	): Promise<IObservable<any[]>> {
		const [entityUtils, dbFacade] = await DI.get(ENTITY_UTILS, ENTITY_MANAGER)
		const rawQuery                  = entityUtils.getQuery(rawNonEntityQuery)
		const query: DistinguishableQuery = new QueryClass(rawQuery)
		return dbFacade.entity.search<any, any[]>(
			null, query, queryResultType)
	}

}
