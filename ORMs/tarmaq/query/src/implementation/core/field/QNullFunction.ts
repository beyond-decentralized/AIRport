import {
	QueryFieldClause,
	QueryClauseObjectType,
	Repository_GUID,
	Repository_LocalId
} from '@airport/ground-control'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IQFunction } from '../../../definition/core/field/IQFunctions'
import { RawFieldQuery } from '../../../definition/query/facade/RawFieldQuery'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { FieldColumnAliases } from '../entity/Aliases'
import { QField } from './QField'

/**
 * Created by Papa on 11/29/2016.
 */

export class QNullFunction
	extends QField<QNullFunction>
	implements IQFunction<boolean | RawFieldQuery<any>> {

	parameterAlias: string
	value = null

	constructor() {
		super(null, null, null, QueryClauseObjectType.FIELD_FUNCTION)
	}

	getInstance(): QNullFunction {
		return this.copyFunctions(new QNullFunction())
	}

	toQueryFragment(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryFieldClause {
		return this.rawToQueryOperableFunction(
			this, columnAliases, forSelectClause,
			trackedRepoGUIDSet, trackedRepoLocalIdSet,
			queryUtils, fieldUtils, queryRelationManager)
	}

}

