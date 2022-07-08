import {
	JSONClauseField,
	JSONClauseObjectType
} from '@airport/ground-control'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { IQFunction } from '../../../definition/core/field/Functions'
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { FieldColumnAliases } from '../entity/Aliases'
import { QField } from './Field'

/**
 * Created by Papa on 11/29/2016.
 */

export class QNullFunction
	extends QField<QNullFunction>
	implements IQFunction<boolean | RawFieldQuery<any>> {

	parameterAlias: string
	value = null

	constructor() {
		super(null, null, null, JSONClauseObjectType.FIELD_FUNCTION)
	}

	getInstance(): QNullFunction {
		return this.copyFunctions(new QNullFunction())
	}

	toJSON(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONClauseField {
		return this.operableFunctionToJson(
			this, columnAliases, forSelectClause,
			queryUtils, fieldUtils, relationManager)
	}

}

