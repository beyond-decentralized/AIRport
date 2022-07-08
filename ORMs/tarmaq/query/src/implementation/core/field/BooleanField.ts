import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	SQLDataType
} from '@airport/ground-control'
import { IQEntityInternal } from '../../../definition/core/entity/Entity'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { IQBooleanField } from '../../../definition/core/field/BooleanField'
import { IQFunction } from '../../../definition/core/field/Functions'
import {
	IBooleanOperation,
	JSONRawBooleanOperation
} from '../../../definition/core/operation/BooleanOperation'
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { FieldColumnAliases } from '../entity/Aliases'
import { BooleanOperation } from '../operation/BooleanOperation'
import { QOperableField } from './OperableField'

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
		q: IQEntityInternal,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new BooleanOperation())
	}

	getInstance(
		qEntity: IQEntityInternal = this.q
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
		super(<any>{ type: SQLDataType.BOOLEAN }, null, null, JSONClauseObjectType.FIELD_FUNCTION)
	}

	getInstance(): QBooleanFunction {
		return this.copyFunctions(new QBooleanFunction(this.value))
	}

	toJSON(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONClauseField {
		let json = this.operableFunctionToJson(
			this, columnAliases, forSelectClause,
			queryUtils, fieldUtils, relationManager)

		if (this.isQueryParameter) {
			this.parameterAlias = <string>json.v
		}

		return json
	}

}
