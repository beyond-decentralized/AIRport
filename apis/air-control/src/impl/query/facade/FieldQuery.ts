import {
	JSONClauseObjectType,
	JsonFieldQuery,
	SQLDataType
}                          from "@airport/ground-control";
import {IEntityAliases}    from "../../../lingo/core/entity/Aliases";
import {IQOrderableField}  from "../../../lingo/core/field/Field";
import {RawFieldQuery}     from "../../../lingo/query/facade/FieldQuery";
import {IQuery}            from "../../../lingo/query/facade/Query";
import {IUtils}            from "../../../lingo/utils/Utils";
import {EntityAliases}     from "../../core/entity/Aliases";
import {QBooleanField}     from "../../core/field/BooleanField";
import {QDateField}        from "../../core/field/DateField";
import {QField}            from "../../core/field/Field";
import {QDistinctFunction} from "../../core/field/Functions";
import {QNumberField}      from "../../core/field/NumberField";
import {QStringField}      from "../../core/field/StringField";
import {QUntypedField}     from "../../core/field/UntypedField";
import {
	DistinguishableQuery,
	NON_ENTITY_SELECT_ERROR_MESSAGE,
}                          from "./NonEntityQuery";

/**
 * Created by Papa on 10/24/2016.
 */

export class FieldQuery<IQF extends IQOrderableField<IQF>>
	extends DistinguishableQuery implements IQuery {

	// private qEntityMap: {[entityName: string]: QEntity<any>},
	//	private entitiesRelationPropertyMap: {[entityName: string]: {[propertyName: string]:
	// EntityRelationRecord}},
//		private entitiesPropertyTypeMap: {[entityName: string]: {[propertyName: string]: boolean}}
	constructor(
		private rawQuery: RawFieldQuery<IQF>,
		private utils: IUtils,
		entityAliases: IEntityAliases = new EntityAliases()
	) {
		super(entityAliases);
	}

	nonDistinctSelectClauseToJSON(rawSelect: any): any {
		if (!(this.rawQuery.select instanceof QField)) {
			throw NON_ENTITY_SELECT_ERROR_MESSAGE;
		}
		this.columnAliases.entityAliases.getNextAlias(this.rawQuery.select.q.__driver__.getRootJoinEntity())
		return (<QField<any>><any>this.rawQuery.select).toJSON(this.columnAliases, true);
	}

	toJSON(): JsonFieldQuery {

		let select = this.selectClauseToJSON(this.rawQuery.select);

		let jsonFieldQuery: JsonFieldQuery = {
			S: select,
			ot: JSONClauseObjectType.FIELD_QUERY,
			dt: this.getClauseDataType()
		};

		return <JsonFieldQuery>this.getNonEntityQuery(
			this.rawQuery, jsonFieldQuery, null, this.utils.Query);
	}


	getClauseDataType(): SQLDataType {
		let selectField = this.rawQuery.select;
		if (selectField instanceof QDistinctFunction) {
			selectField = selectField.getSelectClause();
		}
		if (selectField instanceof QBooleanField) {
			return SQLDataType.BOOLEAN;
		} else if (selectField instanceof QDateField) {
			return SQLDataType.DATE;
		} else if (selectField instanceof QNumberField) {
			return SQLDataType.NUMBER;
		} else if (selectField instanceof QStringField) {
			return SQLDataType.STRING;
		} else if (selectField instanceof QUntypedField) {
			return SQLDataType.ANY;
		} else {
			throw `Unsupported type of select field in Field Query`;
		}
	}

}