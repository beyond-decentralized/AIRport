import {IContext}             from '@airport/di'
import {QueryResultType}      from '@airport/ground-control'
import {IQOrderableField}     from '../../../lingo/core/field/Field'
import {INonEntityFindOne}    from '../../../lingo/query/api/NonEntityFindOne'
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

export class NonEntityFindOne
	extends Lookup
	implements INonEntityFindOne {

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		ctx?: IContext
	): Promise<any[]> {
		return this.findOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery, ctx)
	}

	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		ctx?: IContext
	): Promise<any> {
		return this.findOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery, ctx)
	}

	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> },
		ctx?: IContext
	): Promise<ITE> {
		return this.findOne(rawTreeQuery, QueryResultType.TREE, TreeQuery, ctx)
	}

	findOne<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawNonEntityQuery | { (...args: any[]): RawNonEntityQuery },
		queryResultType: QueryResultType,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
		ctx: IContext
	): Promise<any> {
		return this.lookup(rawNonEntityQuery, queryResultType,
			false, true, QueryClass, this.ensureContext(ctx))
	}

}
