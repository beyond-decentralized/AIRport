import {JsonSheetQuery} from "@airport/ground-control";
import {IQuery}         from "../../../lingo/query/facade/Query";
import {RawSheetQuery}  from "../../../lingo/query/facade/SheetQuery";
import {IUtils}         from "../../../lingo/utils/Utils";
import {QField}         from "../../core/field/Field";
import {
	DistinguishableQuery,
	NON_ENTITY_SELECT_ERROR_MESSAGE,
}                       from "./NonEntityQuery";

/**
 * Created by Papa on 10/23/2016.
 */

export class SheetQuery
	extends DistinguishableQuery implements IQuery {

	constructor(
		public rawQuery: RawSheetQuery,
		private utils: IUtils,
	) {
		super();
	}

	nonDistinctSelectClauseToJSON(rawSelect: any[]): any {
		if (!(rawSelect instanceof Array)) {
			throw `Flat Queries an array of fields in SELECT clause.`;
		}
		return rawSelect.map((selectField) => {
			if (!(selectField instanceof QField)) {
				throw NON_ENTITY_SELECT_ERROR_MESSAGE;
			}
			this.columnAliases.entityAliases.getNextAlias(selectField.q.__driver__.getRootJoinEntity());
			return selectField.toJSON(this.columnAliases, true);
		});
	}

	toJSON(): JsonSheetQuery {

		let select = this.selectClauseToJSON(this.rawQuery.select);

		let jsonFieldQuery: JsonSheetQuery = {
			S: select
		};

		return <JsonSheetQuery>this.getNonEntityQuery(
			this.rawQuery, jsonFieldQuery, null, this.utils.Query);
	}

}