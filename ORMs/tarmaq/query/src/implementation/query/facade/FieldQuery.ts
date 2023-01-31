import {
	JSONClauseObjectType,
	JsonFieldQuery,
	Repository_GUID,
	Repository_LocalId,
	SQLDataType
} from '@airport/ground-control'
import { IEntityAliases } from '../../../definition/core/entity/Aliases'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { IQOrderableField } from '../../../definition/core/field/Field'
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery'
import { IQuery } from '../../../definition/query/facade/Query'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { EntityAliases } from '../../core/entity/Aliases'
import { QBooleanField } from '../../core/field/BooleanField'
import { QDateField } from '../../core/field/DateField'
import { QField } from '../../core/field/Field'
import { QDistinctFunction } from '../../core/field/Functions'
import { QNumberField } from '../../core/field/NumberField'
import { QStringField } from '../../core/field/StringField'
import { QUntypedField } from '../../core/field/UntypedField'
import {
	DistinguishableQuery,
	NON_ENTITY_SELECT_ERROR_MESSAGE,
} from './DistinguishableQuery'

/**
 * Created by Papa on 10/24/2016.
 */

export class FieldQuery<IQF extends IQOrderableField<IQF>>
	extends DistinguishableQuery
	implements IQuery {

	// private qEntityMap: {[entityName: string]: QEntity<any>},
	//	private entitiesRelationPropertyMap: {[entityName: string]: {[propertyName: string]:
	// EntityRelationRecord}},
	//		private entitiesPropertyTypeMap: {[entityName: string]: {[propertyName: string]:
	// boolean}}
	constructor(
		private rawQuery: RawFieldQuery<IQF>,
		entityAliases: IEntityAliases = new EntityAliases(),
		trackedRepoGUIDSet?: Set<Repository_GUID>,
		trackedRepoLocalIdSet?: Set<Repository_LocalId>,
	) {
		super(entityAliases, trackedRepoGUIDSet,
			trackedRepoLocalIdSet)
	}

	nonDistinctSelectClauseToJSON(
		rawSelect: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): any {
		if (!(this.rawQuery.SELECT instanceof QField)) {
			throw new Error(NON_ENTITY_SELECT_ERROR_MESSAGE)
		}
		this.columnAliases.entityAliases.getNextAlias(this.rawQuery.SELECT.q.__driver__.getRootJoinEntity())
		const jsonClauseField = (<QField<any>><any>this.rawQuery.SELECT).toJSON(
			this.columnAliases, true,
			this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
			queryUtils, fieldUtils, relationManager)

		return jsonClauseField
	}

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonFieldQuery {

		let select = this.selectClauseToJSON(
			this.rawQuery.SELECT,
			queryUtils, fieldUtils, relationManager)

		let jsonFieldQuery: JsonFieldQuery = {
			S: select,
			forUpdate: this.rawQuery.FOR_UPDATE,
			ot: JSONClauseObjectType.FIELD_QUERY,
			dt: this.getClauseDataType()
		}

		return <JsonFieldQuery>this.getNonEntityQuery(
			this.rawQuery, jsonFieldQuery, null,
			queryUtils, fieldUtils, relationManager)
	}


	getClauseDataType(): SQLDataType {
		let selectField = this.rawQuery.SELECT
		if (selectField instanceof QDistinctFunction) {
			selectField = selectField.getSelectClause()
		}
		if (selectField instanceof QBooleanField) {
			return SQLDataType.BOOLEAN
		} else if (selectField instanceof QDateField) {
			return SQLDataType.DATE
		} else if (selectField instanceof QNumberField) {
			return SQLDataType.NUMBER
		} else if (selectField instanceof QStringField) {
			return SQLDataType.STRING
		} else if (selectField instanceof QUntypedField) {
			return SQLDataType.ANY
		} else {
			throw new Error(`Unsupported type of SELECT field in Field Query`)
		}
	}

}
