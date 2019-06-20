import {DI}                from '@airport/di'
import {QueryResultType}   from '@airport/ground-control'
import {
	ENTITY_UTILS,
	NON_ENTITY_FIND_ONE,
	QUERY_FACADE
}                          from '../../../diTokens'
import {IQOrderableField}  from '../../../lingo/core/field/Field'
import {INonEntityFindOne} from '../../../lingo/query/api/NonEntityFindOne'
import {RawFieldQuery}     from '../../../lingo/query/facade/FieldQuery'
import {RawSheetQuery}     from '../../../lingo/query/facade/SheetQuery'
import {
	ITreeEntity,
	RawTreeQuery
}                          from '../../../lingo/query/facade/TreeQuery'
import {FieldQuery}        from '../facade/FieldQuery'
import {SheetQuery}        from '../facade/SheetQuery'
import {TreeQuery}         from '../facade/TreeQuery'

/**
 * Created by Papa on 11/12/2016.
 */

export class NonEntityFindOne
	implements INonEntityFindOne {

	async tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): Promise<ITE> {
		const [entityUtils, queryFacade] = await DI.get(ENTITY_UTILS, QUERY_FACADE)
		const rawQuery                   = entityUtils.getQuery(rawTreeQuery)
		const treeQuery: TreeQuery<ITE>  = new TreeQuery(rawQuery)
		return await queryFacade.findOne<ITE>(
			null, treeQuery, QueryResultType.TREE)
	}

	async sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery }
	): Promise<any[]> {
		const [entityUtils, queryFacade] = await DI.get(ENTITY_UTILS, QUERY_FACADE)
		const rawQuery                   = entityUtils.getQuery(rawSheetQuery)
		const sheetQuery: SheetQuery     = new SheetQuery(rawQuery)
		return await queryFacade.findOne<any>(
			null, sheetQuery, QueryResultType.SHEET)
	}

	async field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): Promise<any> {
		const [entityUtils, queryFacade]  = await DI.get(ENTITY_UTILS, QUERY_FACADE)
		const rawQuery                    = entityUtils.getQuery(rawFieldQuery)
		const fieldQuery: FieldQuery<IQF> = new FieldQuery(rawQuery)
		return await queryFacade.findOne<any>(
			null, fieldQuery, QueryResultType.FIELD)
	}

}

DI.set(NON_ENTITY_FIND_ONE, NonEntityFindOne)
