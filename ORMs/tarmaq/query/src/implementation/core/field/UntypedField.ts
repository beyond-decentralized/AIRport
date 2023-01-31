import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	Repository_GUID,
	Repository_LocalId,
} from '@airport/ground-control'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { IQFunction } from '../../../definition/core/field/Functions'
import { IQUntypedField } from '../../../definition/core/field/UntypedField'
import {
	IUntypedOperation,
	JSONRawUntypedOperation
} from '../../../definition/core/operation/UntypedOperation'
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { FieldColumnAliases } from '../entity/Aliases'
import { UntypedOperation } from '../operation/UntypedOperation'
import { QOperableField } from './OperableField'

/**
 * Created by papa on 7/13/17.
 */

export interface IQUntypedEntityField
	extends IQUntypedField {
}

export class QUntypedField
	extends QOperableField<number | string, JSONRawUntypedOperation, IUntypedOperation, IQUntypedField>
	implements IQUntypedField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new UntypedOperation())
	}

	getInstance(qEntity: IQEntityInternal = this.q): QUntypedField {
		return this.copyFunctions(
			new QUntypedField(this.dbColumn, this.dbProperty, qEntity, this.objectType))
	}

	like(
		value: string | IQUntypedField | RawFieldQuery<IQUntypedField> | { (...args: any[]): RawFieldQuery<IQUntypedField> }
	): JSONRawUntypedOperation {
		if (value instanceof Function) {
			value = value()
		}
		return this.operation.LIKE(<any>this, value)
	}

}

export class QUntypedFunction
	extends QUntypedField
	implements IQFunction<number | string | RawFieldQuery<any>> {

	parameterAlias: string

	constructor(
		public value: number | string | RawFieldQuery<any>,
		private isQueryParameter: boolean = false
	) {
		// super(<any>{type: SQLDataType.ANY}, null, null, JSONClauseObjectType.FIELD_FUNCTION)
		super(<any>{ type: null }, null, null, JSONClauseObjectType.FIELD_FUNCTION)
		throw new Error(`Untyped data type is not supported`)
	}

	getInstance(): QUntypedFunction {
		return this.copyFunctions(new QUntypedFunction(this.value))
	}

	toJSON(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONClauseField {
		let json = this.operableFunctionToJson(
			this, columnAliases, forSelectClause,
			trackedRepoGUIDSet, trackedRepoLocalIdSet,
			queryUtils, fieldUtils, relationManager)

		if (this.isQueryParameter) {
			this.parameterAlias = <string>json.v
		}

		return json
	}
}
