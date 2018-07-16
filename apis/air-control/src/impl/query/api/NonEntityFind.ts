import {QueryResultType}  from "@airport/ground-control";
import {IQOrderableField} from "../../../lingo/core/field/Field";
import {IDatabaseFacade}  from "../../../lingo/core/repository/DatabaseFacade";
import {INonEntityFind}   from "../../../lingo/query/api/NonEntityFind";
import {RawFieldQuery}    from "../../../lingo/query/facade/FieldQuery";
import {RawSheetQuery}    from "../../../lingo/query/facade/SheetQuery";
import {
	ITreeEntity,
	RawTreeQuery
}                         from "../../../lingo/query/facade/TreeQuery";
import {IUtils}           from "../../../lingo/utils/Utils";
import {FieldQuery}       from "../facade/FieldQuery";
import {SheetQuery}       from "../facade/SheetQuery";
import {TreeQuery}        from "../facade/TreeQuery";

/**
 * Created by Papa on 11/12/2016.
 */

export class NonEntityFind
	implements INonEntityFind {

	constructor(
		private dbFacade: IDatabaseFacade,
		private utils: IUtils,
	) {
	}

	async tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): Promise<ITE[]> {
		const treeQuery: TreeQuery<ITE>
			      = new TreeQuery(this.utils.Entity.getQuery(rawTreeQuery), this.utils);
		return await this.dbFacade.entity.find<ITE, ITE[]>(
			null, treeQuery, QueryResultType.TREE);
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
			throw `Implement!`;
		}
		const sheetQuery: SheetQuery
			      = new SheetQuery(this.utils.Entity.getQuery(rawSheetQuery), this.utils);
		return await this.dbFacade.entity.find<any, any[]>(
			null, sheetQuery, QueryResultType.SHEET);
	}

	async field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): Promise<any[]> {
		const fieldQuery: FieldQuery<IQF>
			      = new FieldQuery(this.utils.Entity.getQuery(rawFieldQuery), this.utils);
		return await this.dbFacade.entity.find<any, any[]>(
			null, fieldQuery, QueryResultType.FIELD);
	}

}