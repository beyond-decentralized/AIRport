import {
	DbColumn,
	DbProperty,
	QueryFieldClause,
	QueryClauseObjectType,
	Repository_GUID,
	Repository_LocalId,
	SQLDataType
} from '@airport/ground-control'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IQBooleanField } from '../../../definition/core/field/IQBooleanField'
import { IQFunction } from '../../../definition/core/field/IQFunctions'
import {
	IBooleanOperation,
	RawBooleanOperation
} from '../../../definition/core/operation/IBooleanOperation'
import { RawFieldQuery } from '../../../definition/query/facade/RawFieldQuery'
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
	extends QOperableField<boolean, RawBooleanOperation, IBooleanOperation, IQBooleanField>
	implements IQBooleanField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		objectType: QueryClauseObjectType = QueryClauseObjectType.FIELD
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
		super(<any>{ type: SQLDataType.BOOLEAN }, null, null, QueryClauseObjectType.FIELD_FUNCTION)
	}

	getInstance(): QBooleanFunction {
		return this.copyFunctions(new QBooleanFunction(this.value))
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
			this.parameterAlias = <string>queryFieldClause.v
		}

		return queryFieldClause
	}

}
