import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	SQLDataType
}                           from '@airport/ground-control'
import {IQEntityInternal}   from '../../../lingo/core/entity/Entity'
import {IQBooleanField}     from '../../../lingo/core/field/BooleanField'
import {IQFunction}         from '../../../lingo/core/field/Functions'
import {
	IBooleanOperation,
	JSONRawBooleanOperation
}                           from '../../../lingo/core/operation/BooleanOperation'
import {RawFieldQuery}      from '../../../lingo/query/facade/FieldQuery'
import {IFieldUtils}        from '../../../lingo/utils/FieldUtils'
import {IQueryUtils}        from '../../../lingo/utils/QueryUtils'
import {FieldColumnAliases} from '../entity/Aliases'
import {BooleanOperation}   from '../operation/BooleanOperation'
import {QOperableField}     from './OperableField'

/**
 * Created by Papa on 8/10/2016.
 */

export interface IQBooleanEntityField
	extends IQBooleanField {
}

export class QBooleanField
	extends QOperableField<boolean, JSONRawBooleanOperation, IBooleanOperation, IQBooleanField>
	implements IQBooleanField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal<any>,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new BooleanOperation())
	}

	getInstance(
		qEntity: IQEntityInternal<any> = this.q
	): QBooleanField {
		return this.copyFunctions(
			new QBooleanField(this.dbColumn, this.dbProperty, qEntity, this.objectType))
	}

}

export class QBooleanFunction
	extends QBooleanField
	implements IQFunction<boolean | RawFieldQuery<any>> {

	parameterAlias: string

	constructor(
		public value: boolean | RawFieldQuery<QBooleanField>,
		private isQueryParameter: boolean = false
	) {
		super(<any>{type: SQLDataType.BOOLEAN}, null, null, JSONClauseObjectType.FIELD_FUNCTION)
	}

	getInstance(): QBooleanFunction {
		return this.copyFunctions(new QBooleanFunction(this.value))
	}

	toJSON(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JSONClauseField {
		let json = this.operableFunctionToJson(
			this, columnAliases, forSelectClause, queryUtils, fieldUtils)

		if (this.isQueryParameter) {
			this.parameterAlias = <string>json.v
		}

		return json
	}

}
