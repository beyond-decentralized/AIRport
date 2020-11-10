import {IContext}          from '@airport/di'
import {QueryResultType}  from '@airport/ground-control'
import {
	IEntityOperationContext
}                         from '../../../lingo/core/data/EntityContext'
import {IQOrderableField} from '../../../lingo/core/field/Field'
import {INonEntityFind}    from '../../../lingo/query/api/NonEntityFind'
import {RawFieldQuery}     from '../../../lingo/query/facade/FieldQuery'
import {RawNonEntityQuery} from '../../../lingo/query/facade/NonEntityQuery'
import {RawSheetQuery}     from '../../../lingo/query/facade/SheetQuery'
import {
	ITreeEntity,
	RawTreeQuery
}                          from '../../../lingo/query/facade/TreeQuery'
import {FieldQuery}        from '../facade/FieldQuery'
import {DistinguishableQuery} from '../facade/NonEntityQuery'
import {SheetQuery}           from '../facade/SheetQuery'
import {TreeQuery}            from '../facade/TreeQuery'
import {Lookup}               from './Lookup'

/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntityFind
	extends Lookup
	implements INonEntityFind {

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> },
		ctx?: IContext
	): Promise<any[]> {
		return this.find(rawFieldQuery, QueryResultType.FIELD, FieldQuery, ctx)
	}

	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void,
		ctx?: IContext
	): Promise<any[][]> {
		if (cursorSize || callback) {
			throw new Error(`Implement!`)
		}

		return this.find(rawSheetQuery, QueryResultType.SHEET, SheetQuery, ctx)
	}

	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> },
		ctx?: IContext
	): Promise<ITE[]> {
		return this.find(rawTreeQuery, QueryResultType.TREE, TreeQuery, ctx)
	}

	find<IQF extends IQOrderableField<IQF>>(
		rawNonEntityQuery: RawNonEntityQuery | { (...args: any[]): RawNonEntityQuery },
		queryResultType: QueryResultType,
		QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery,
		ctx: IContext
	): Promise<any[]> {
		return this.lookup(rawNonEntityQuery, queryResultType,
			false, false, QueryClass, this.ensureContext(ctx) as IEntityOperationContext)
	}

}
