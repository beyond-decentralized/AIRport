import {DI}                  from '@airport/di'
import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	JsonFieldQuery,
	JSONSqlFunctionCall,
	SortOrder
}                            from '@airport/ground-control'
import {IFieldColumnAliases} from '../../../lingo/core/entity/Aliases'
import {IQEntityInternal}    from '../../../lingo/core/entity/Entity'
import {
	IQFieldInternal,
	IQOrderableField
}                            from '../../../lingo/core/field/Field'
import {IFieldInOrderBy}     from '../../../lingo/core/field/FieldInOrderBy'
import {IQFunction}          from '../../../lingo/core/field/Functions'
import {RawFieldQuery}       from '../../../lingo/query/facade/FieldQuery'
import {IFieldUtils}         from '../../../lingo/utils/FieldUtils'
import {IQueryUtils}         from '../../../lingo/utils/QueryUtils'
import {RELATION_MANAGER}    from '../../../tokens'
import {FieldColumnAliases}  from '../entity/Aliases'
import {IAppliable}          from './Appliable'
import {FieldInOrderBy}      from './FieldInOrderBy'

/**
 * Created by Papa on 4/21/2016.
 */

export abstract class QField<IQF extends IQOrderableField<IQF>>
	implements IQFieldInternal<IQF>,
	           IAppliable<JSONClauseField, IQF> {

	// TODO: figure out if this is ever used
	alias: string
	__appliedFunctions__: JSONSqlFunctionCall[] = []
	__fieldSubQuery__: RawFieldQuery<IQF>

	constructor(
		public dbColumn: DbColumn,
		public dbProperty: DbProperty,
		public q: IQEntityInternal<any>,
		public objectType: JSONClauseObjectType,
	) {
	}

	/**
	 protected getFieldKey() {
		const relationManager = DI.db().getSync(RELATION_MANAGER)
		let rootEntityPrefix = columnAliases.entityAliases.getExistingAlias(this.parentQ.getRootJoinEntity());
		let key = `${relationManager.getPositionAlias(rootEntityPrefix, this.parentQ.fromClausePosition)}.${this.fieldName}`;
		return key;
	}
	 */

	asc(): IFieldInOrderBy<IQF> {
		return new FieldInOrderBy<IQF>(this, SortOrder.ASCENDING)
	}

	desc(): IFieldInOrderBy<IQF> {
		return new FieldInOrderBy<IQF>(this, SortOrder.DESCENDING)
	}

	abstract getInstance(qEntity?: IQEntityInternal<any>): QField<IQF>;

	applySqlFunction(sqlFunctionCall: JSONSqlFunctionCall): IQF {
		let appliedField = this.getInstance()
		appliedField.__appliedFunctions__.push(sqlFunctionCall)

		return <IQF><any>appliedField
	}

	addSubQuery(
		subQuery: RawFieldQuery<IQF>
	): IQF {
		let appliedField               = this.getInstance()
		appliedField.__fieldSubQuery__ = subQuery

		return <IQF><any>appliedField
	}

	toJSON(
		columnAliases: IFieldColumnAliases<IQF>,
		forSelectClause: boolean,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JSONClauseField {
		const relationManager = DI.db().getSync(RELATION_MANAGER)
		let alias
		if (forSelectClause) {
			alias = columnAliases.getNextAlias(this)
		}
		let rootEntityPrefix
		if (this.__fieldSubQuery__) {
			rootEntityPrefix = columnAliases.entityAliases.getOnlyAlias()
		} else {
			rootEntityPrefix = columnAliases.entityAliases.getExistingAlias(this.q.__driver__.getRootJoinEntity())
		}
		let jsonField: JSONClauseField = {
			af: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases,
				queryUtils, fieldUtils),
			si: this.dbProperty.entity.schemaVersion.id,
			ti: this.dbProperty.entity.index,
			fa: alias,
			pi: this.dbProperty.index,
			ci: this.dbColumn.index,
			ta: relationManager.getPositionAlias(rootEntityPrefix, this.q.__driver__.fromClausePosition),
			ot: this.objectType,
			dt: this.dbColumn.type
		}
		if (this.__fieldSubQuery__) {
			jsonField.fsq = fieldUtils.getFieldQueryJson(
				this.__fieldSubQuery__, columnAliases.entityAliases, queryUtils)
			jsonField.ot  = JSONClauseObjectType.FIELD_QUERY
		}

		return jsonField
	}

	operableFunctionToJson(
		functionObject: IQFunction<any>,
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JSONClauseField {
		let alias
		if (forSelectClause) {
			alias = columnAliases.getNextAlias(this)
		}
		return {
			af: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases,
				queryUtils, fieldUtils),
			fa: alias,
			ot: this.objectType,
			dt: this.dbColumn.type,
			v: this.valueToJSON(functionObject, columnAliases, false,
				true, queryUtils, fieldUtils)
		}
	}

	protected copyFunctions<QF extends QField<IQF>>(field: QF): QF {
		field.__appliedFunctions__ = this.__appliedFunctions__.slice()
		return field
	}

	protected appliedFunctionsToJson(
		appliedFunctions: JSONSqlFunctionCall[],
		columnAliases: IFieldColumnAliases<IQF>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JSONSqlFunctionCall[] {
		if (!appliedFunctions) {
			return appliedFunctions
		}
		return appliedFunctions.map((appliedFunction) => {
			return this.functionCallToJson(
				appliedFunction, columnAliases, queryUtils, fieldUtils)
		})
	}

	protected functionCallToJson(
		functionCall: JSONSqlFunctionCall,
		columnAliases: IFieldColumnAliases<IQF>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JSONSqlFunctionCall {
		let parameters
		if (functionCall.p) {
			parameters = functionCall.p.map((parameter) => {
				return this.valueToJSON(
					parameter, columnAliases, false, false,
					queryUtils, fieldUtils)
			})
		}
		return {
			ft: functionCall.ft,
			p: parameters
		}
	}

	protected valueToJSON(
		functionObject: IQFunction<any> | QField<any>,
		columnAliases: IFieldColumnAliases<IQF>,
		forSelectClause: boolean,
		fromFunctionObject: boolean,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): string | JSONClauseField | JsonFieldQuery {
		if (!functionObject) {
			throw new Error(`Function object must be provided to valueToJSON function.`)
		}
		if (!fromFunctionObject && functionObject instanceof QField) {
			return functionObject.toJSON(
				columnAliases, forSelectClause, queryUtils, fieldUtils)
		}

		let value = (functionObject as IQFunction<any>).value
		switch (typeof value) {
			case 'boolean':
			case 'number':
			case 'string':
				return columnAliases.entityAliases.getParams()
					.getNextAlias(functionObject as IQFunction<any>)
			case 'undefined':
				throw new Error(`Undefined is not allowed as a query parameter`)
		}
		// TODO: this never gets called, is this needed?
		/*
		if (value === null || value instanceof Date) {
			return columnAliases.entityAliases.getParams()
				.getNextAlias(functionObject as IQFunction<any>)
		}
		if (value instanceof QField) {
			return value.toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils)
		}
		// must be a field sub-query
		let rawFieldQuery: RawFieldQuery<any> = value
		return fieldUtils.getFieldQueryJson(
			rawFieldQuery, columnAliases.entityAliases, queryUtils)
		 */
	}
}
