import {DI}               from '@airport/di'
import {QueryResultType}  from '@airport/ground-control'
import {ENTITY_UTILS}     from '../../../diTokens'
import {IQOrderableField} from '../../../lingo/core/field/Field'
import {IDatabaseFacade}  from '../../../lingo/core/repository/DatabaseFacade'
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

	constructor(
		private dbFacade: IDatabaseFacade
	) {
	}

	async tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): Promise<ITE[]> {
		const rawQuery = (await DI.get(ENTITY_UTILS)).getQuery(rawTreeQuery)
		const treeQuery: TreeQuery<ITE> = new TreeQuery(rawQuery)
		return await this.dbFacade.entity.find<ITE, ITE[]>(
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
		const rawQuery = (await DI.get(ENTITY_UTILS)).getQuery(rawSheetQuery)
		const sheetQuery: SheetQuery = new SheetQuery(rawQuery)
		return await this.dbFacade.entity.find<any, any[]>(
			null, sheetQuery, QueryResultType.SHEET)
	}

	async field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): Promise<any[]> {
		const rawQuery = (await DI.get(ENTITY_UTILS)).getQuery(rawFieldQuery)
		const fieldQuery: FieldQuery<IQF> = new FieldQuery(rawQuery)
		return await this.dbFacade.entity.find<any, any[]>(
			null, fieldQuery, QueryResultType.FIELD)
	}

}
