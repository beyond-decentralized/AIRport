import {DI}               from '@airport/di'
import {QueryResultType}  from '@airport/ground-control'
import {
	ENTITY_MANAGER,
	ENTITY_UTILS,
	NON_ENTITY_FIND,
	QUERY_FACADE
} from '../../../diTokens'
import {IQOrderableField} from '../../../lingo/core/field/Field'
import {INonEntityFind}   from '../../../lingo/query/api/NonEntityFind'
import {RawFieldQuery}    from '../../../lingo/query/facade/FieldQuery'
import {RawSheetQuery}    from '../../../lingo/query/facade/SheetQuery'
import {
	ITreeEntity,
	RawTreeQuery
}                         from '../../../lingo/query/facade/TreeQuery'
import {FieldQuery}       from '../facade/FieldQuery'
import {SheetQuery}       from '../facade/SheetQuery'
import {TreeQuery}        from '../facade/TreeQuery'

/**
 * Created by Papa on 11/12/2016.
 */

export class NonEntityFind
	implements INonEntityFind {

	async tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): Promise<ITE[]> {
		const [entityUtils, queryFacade] = await DI.get(ENTITY_UTILS, QUERY_FACADE)
		const rawQuery                  = entityUtils.getQuery(rawTreeQuery)
		const treeQuery: TreeQuery<ITE> = new TreeQuery(rawQuery)
		return await queryFacade.find<ITE, ITE[]>(
			null, treeQuery, QueryResultType.TREE)
	}

	async sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void,
	): Promise<any[][]> {
		if (cursorSize || callback) {
			throw `Implement!`
		}
		const [entityUtils, queryFacade] = await DI.get(ENTITY_UTILS, QUERY_FACADE)
		const rawQuery                  = entityUtils.getQuery(rawSheetQuery)
		const sheetQuery: SheetQuery = new SheetQuery(rawQuery)
		return await queryFacade.find<any, any[]>(
			null, sheetQuery, QueryResultType.SHEET)
	}

	async field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): Promise<any[]> {
		const [entityUtils, queryFacade] = await DI.get(ENTITY_UTILS, QUERY_FACADE)
		const rawQuery                  = entityUtils.getQuery(rawFieldQuery)
		const fieldQuery: FieldQuery<IQF> = new FieldQuery(rawQuery)
		return await queryFacade.find<any, any[]>(
			null, fieldQuery, QueryResultType.FIELD)
	}

}

DI.set(NON_ENTITY_FIND, NonEntityFind)
