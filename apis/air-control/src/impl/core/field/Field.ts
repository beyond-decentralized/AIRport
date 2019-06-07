import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	JsonFieldQuery,
	JSONSqlFunctionCall,
	SortOrder
}                            from "@airport/ground-control";
import {IQFunction}          from "../../../";
import {IFieldColumnAliases} from "../../../lingo/core/entity/Aliases";
import {IQEntityInternal}    from "../../../lingo/core/entity/Entity";
import {
	IQFieldInternal,
	IQOrderableField
}                            from "../../../lingo/core/field/Field";
import {IFieldInOrderBy}     from "../../../lingo/core/field/FieldInOrderBy";
import {RawFieldQuery}       from "../../../lingo/query/facade/FieldQuery";
import {IUtils}              from "../../../lingo/utils/Utils";
import {FieldColumnAliases}  from "../entity/Aliases";
import {QRelation}           from "../entity/Relation";
import {IAppliable}          from "./Appliable";
import {FieldInOrderBy}      from "./FieldInOrderBy";

/**
 * Created by Papa on 4/21/2016.
 */

export abstract class QField<IQF extends IQOrderableField<IQF>>
	implements IQFieldInternal<IQF>,
		IAppliable<JSONClauseField, IQF> {

	// TODO: figure out if this is ever used
	alias: string;
	__appliedFunctions__: JSONSqlFunctionCall[] = [];
	__fieldSubQuery__: RawFieldQuery<IQF>;

	constructor(
		public dbColumn: DbColumn,
		public dbProperty: DbProperty,
		public q: IQEntityInternal,
		public objectType: JSONClauseObjectType,
		protected utils: IUtils,
	) {
	}

	/**
	 protected getFieldKey() {
		let rootEntityPrefix = columnAliases.entityAliases.getExistingAlias(this.parentQ.getRootJoinEntity());
		let key = `${QRelation.getPositionAlias(rootEntityPrefix, this.parentQ.fromClausePosition)}.${this.fieldName}`;
		return key;
	}
	 */

	asc(): IFieldInOrderBy<IQF> {
		return new FieldInOrderBy<IQF>(this, SortOrder.ASCENDING);
	}

	desc(): IFieldInOrderBy<IQF> {
		return new FieldInOrderBy<IQF>(this, SortOrder.DESCENDING);
	}

	abstract getInstance(qEntity?: IQEntityInternal): QField<IQF>;

	applySqlFunction(sqlFunctionCall: JSONSqlFunctionCall): IQF {
		let appliedField = this.getInstance();
		appliedField.__appliedFunctions__.push(sqlFunctionCall);

		return <IQF><any>appliedField;
	}

	addSubQuery(
		subQuery: RawFieldQuery<IQF>
	): IQF {
		let appliedField               = this.getInstance();
		appliedField.__fieldSubQuery__ = subQuery;

		return <IQF><any>appliedField;
	}

	toJSON(
		columnAliases: IFieldColumnAliases<IQF>,
		forSelectClause: boolean
	): JSONClauseField {
		let alias;
		if (forSelectClause) {
			alias = columnAliases.getNextAlias(this);
		}
		let rootEntityPrefix;
		if (this.__fieldSubQuery__) {
			rootEntityPrefix = columnAliases.entityAliases.getOnlyAlias();
		} else {
			rootEntityPrefix = columnAliases.entityAliases.getExistingAlias(this.q.__driver__.getRootJoinEntity());
		}
		let jsonField: JSONClauseField = {
			af: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases),
			si: this.dbProperty.entity.schemaVersion.id,
			ti: this.dbProperty.entity.index,
			fa: alias,
			pi: this.dbProperty.index,
			ci: this.dbColumn.index,
			ta: QRelation.getPositionAlias(rootEntityPrefix, this.q.__driver__.fromClausePosition),
			ot: this.objectType,
			dt: this.dbColumn.type
		};
		if (this.__fieldSubQuery__) {
			jsonField.fsq = this.utils.Field.getFieldQueryJson(this.__fieldSubQuery__, columnAliases.entityAliases);
			jsonField.ot  = JSONClauseObjectType.FIELD_QUERY;
		}

		return jsonField;
	}

	operableFunctionToJson(
		functionObject: IQFunction<any>,
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean
	): JSONClauseField {
		let alias;
		if (forSelectClause) {
			alias = columnAliases.getNextAlias(this);
		}
		return {
			af: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases),
			fa: alias,
			ot: this.objectType,
			dt: this.dbColumn.type,
			v: this.valueToJSON(functionObject, columnAliases, false)
		};
	}

	protected copyFunctions<QF extends QField<IQF>>(field: QF): QF {
		field.__appliedFunctions__ = this.__appliedFunctions__.slice();
		return field;
	}

	private appliedFunctionsToJson(
		appliedFunctions: JSONSqlFunctionCall[],
		columnAliases: IFieldColumnAliases<IQF>
	): JSONSqlFunctionCall[] {
		if (!appliedFunctions) {
			return appliedFunctions;
		}
		return appliedFunctions.map((appliedFunction) => {
			return this.functionCallToJson(appliedFunction, columnAliases);
		});
	}

	private functionCallToJson(
		functionCall: JSONSqlFunctionCall,
		columnAliases: IFieldColumnAliases<IQF>
	): JSONSqlFunctionCall {
		let parameters;
		if (functionCall.p) {
			parameters = functionCall.p.map((parameter) => {
				return this.valueToJSON(parameter, columnAliases, false);
			});
		}
		return {
			ft: functionCall.ft,
			p: parameters
		};
	}

	private valueToJSON(
		functionObject: IQFunction<any>,
		columnAliases: IFieldColumnAliases<IQF>,
		forSelectClause: boolean
	): string | JSONClauseField | JsonFieldQuery {
		if (!functionObject) {
			throw `Function object must be provided to valueToJSON function.`;
		}
		let value = functionObject.value;
		switch (typeof value) {
			case "boolean":
			case "number":
			case "string":
				return columnAliases.entityAliases.getParams().getNextAlias(functionObject);
			case "undefined":
				throw `Undefined is not allowed as a query parameter`;
		}
		if (value === null) {
			return columnAliases.entityAliases.getParams().getNextAlias(functionObject);
		}
		if (value instanceof Date) {
			return columnAliases.entityAliases.getParams().getNextAlias(functionObject)
		}
		if (value instanceof QField) {
			return value.toJSON(columnAliases, forSelectClause);
		}
		// must be a field sub-query
		let rawFieldQuery: RawFieldQuery<any> = value;
		return this.utils.Field.getFieldQueryJson(rawFieldQuery, columnAliases.entityAliases);
	}
}
