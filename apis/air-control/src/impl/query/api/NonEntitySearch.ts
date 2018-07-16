import {QueryResultType}  from "@airport/ground-control";
import {Observable}       from "rxjs";
import {IQOrderableField} from "../../../lingo/core/field/Field";
import {IDatabaseFacade}  from "../../../lingo/core/repository/DatabaseFacade";
import {INonEntitySearch} from "../../../lingo/query/api/NonEntitySearch";
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

export class NonEntitySearch implements INonEntitySearch {

	constructor(
		private dbFacade: IDatabaseFacade,
		private utils: IUtils,
	) {
	}

	tree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): Observable<ITE[]> {
		const treeQuery: TreeQuery<ITE>
			      = new TreeQuery(this.utils.Entity.getQuery(rawTreeQuery), this.utils);
		return this.dbFacade.entity.search<ITE, ITE[]>(
			null, treeQuery, QueryResultType.TREE);
	}

	sheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery }
	): Observable<any[][]> {
		const sheetQuery: SheetQuery
			      = new SheetQuery(this.utils.Entity.getQuery(rawSheetQuery), this.utils);
		return this.dbFacade.entity.search<any, any[]>(
			null, sheetQuery, QueryResultType.SHEET);
	}

	field<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): Observable<any[]> {
		const fieldQuery: FieldQuery<IQF>
			      = new FieldQuery(this.utils.Entity.getQuery(rawFieldQuery), this.utils);
		return this.dbFacade.entity.search<any, any[]>(
			null, fieldQuery, QueryResultType.FIELD);
	}

}