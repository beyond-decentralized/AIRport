import {JsonFieldQuery}   from "@airport/ground-control";
import {IEntityAliases}   from "../../lingo/core/entity/Aliases";
import {IQOrderableField} from "../../lingo/core/field/Field";
import {RawFieldQuery}    from "../../lingo/query/facade/FieldQuery";
import {IFieldUtils}      from "../../lingo/utils/FieldUtils";
import {IUtils}           from "../../lingo/utils/Utils";
import {FieldQuery}       from "../query/facade/FieldQuery";


declare function require(moduleName: string): any;

export class FieldUtils
	implements IFieldUtils {

	FieldQuery: typeof FieldQuery;

	constructor(
		private utils: IUtils
	) {
	}

	getFieldQueryJson<IQF extends IQOrderableField<IQF>>(
		fieldSubQuery: RawFieldQuery<IQF>,
		entityAliases: IEntityAliases
	): JsonFieldQuery {
		if (!this.FieldQuery) {
			this.FieldQuery = require('../query/facade/FieldQuery').FieldQuery;
		}
		let subSelectQuery = new this.FieldQuery(fieldSubQuery, this.utils, entityAliases);

		return subSelectQuery.toJSON();
	}
}