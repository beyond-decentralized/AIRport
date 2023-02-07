import {
	DbColumn,
	DbProperty,
	QueryFieldClause,
	QueryClauseObjectType,
	Repository_GUID,
	Repository_LocalId,
} from '@airport/ground-control'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IQFunction } from '../../../definition/core/field/IQFunctions'
import { IQUntypedField } from '../../../definition/core/field/IQUntypedField'
import {
	IUntypedOperation,
	RawUntypedOperation
} from '../../../definition/core/operation/IUntypedOperation'
import { RawFieldQuery } from '../../../definition/query/facade/RawFieldQuery'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { FieldColumnAliases } from '../entity/aliases'
import { UntypedOperation } from '../operation/UntypedOperation'
import { QOperableField } from './QOperableField'

/**
 * Created by papa on 7/13/17.
 */

export interface IQUntypedEntityField
	extends IQUntypedField {
}

export class QUntypedField
	extends QOperableField<number | string, RawUntypedOperation, IUntypedOperation, IQUntypedField>
	implements IQUntypedField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		objectType: QueryClauseObjectType = QueryClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new UntypedOperation())
	}

	getInstance(qEntity: IQEntityInternal = this.q): QUntypedField {
		return this.copyFunctions(
			new QUntypedField(this.dbColumn, this.dbProperty, qEntity, this.objectType))
	}

	like(
		value: string | IQUntypedField | RawFieldQuery<IQUntypedField> | { (...args: any[]): RawFieldQuery<IQUntypedField> }
	): RawUntypedOperation {
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
		// super(<any>{type: SQLDataType.ANY}, null, null, QueryClauseObjectType.FIELD_FUNCTION)
		super(<any>{ type: null }, null, null, QueryClauseObjectType.FIELD_FUNCTION)
		throw new Error(`Untyped data type is not supported`)
	}

	getInstance(): QUntypedFunction {
		return this.copyFunctions(new QUntypedFunction(this.value))
	}

	toQueryFragment(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): QueryFieldClause {
		let queryFieldClause = this.rawToQueryOperableFunction(
			this, columnAliases, forSelectClause,
			trackedRepoGUIDSet, trackedRepoLocalIdSet,
			queryUtils, fieldUtils, relationManager)

		if (this.isQueryParameter) {
			this.parameterAlias = <string>queryFieldClause.value
		}

		return queryFieldClause
	}
}
