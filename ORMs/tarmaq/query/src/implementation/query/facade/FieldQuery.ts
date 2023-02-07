import {
	QueryClauseObjectType,
	QueryField,
	Repository_GUID,
	Repository_LocalId,
	SQLDataType
} from '@airport/ground-control'
import { IEntityAliases } from '../../../definition/core/entity/IAliases'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IQOrderableField } from '../../../definition/core/field/IQFieldInternal'
import { RawFieldQuery } from '../../../definition/query/facade/RawFieldQuery'
import { IReadQuery } from '../../../definition/query/facade/RawReadQuery'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { EntityAliases } from '../../core/entity/aliases'
import { QBooleanField } from '../../core/field/QBooleanField'
import { QDateField } from '../../core/field/QDateField'
import { QField } from '../../core/field/QField'
import { QDistinctFunction } from '../../core/field/functions'
import { QNumberField } from '../../core/field/QNumberField'
import { QStringField } from '../../core/field/QStringField'
import { QUntypedField } from '../../core/field/QUntypedField'
import {
	DistinguishableQuery,
	NON_ENTITY_SELECT_ERROR_MESSAGE,
} from './DistinguishableQuery'

/**
 * Created by Papa on 10/24/2016.
 */

export class FieldQuery<IQF extends IQOrderableField<IQF>>
	extends DistinguishableQuery
	implements IReadQuery {

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

	rawToQueryNonDistinctSelectClause(
		rawSelect: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): any {
		if (!(this.rawQuery.SELECT instanceof QField)) {
			throw new Error(NON_ENTITY_SELECT_ERROR_MESSAGE)
		}
		this.columnAliases.entityAliases.getNextAlias(this.rawQuery.SELECT.q.__driver__.getRootJoinEntity())
		const queryClauseField = (<QField<any>><any>this.rawQuery.SELECT).toQueryFragment(
			this.columnAliases, true,
			this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
			queryUtils, fieldUtils, queryRelationManager)

		return queryClauseField
	}

	toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryField {

		let select = this.rawToQuerySelectClause(
			this.rawQuery.SELECT,
			queryUtils, fieldUtils, queryRelationManager)

		let queryField: QueryField = {
			SELECT: select,
			forUpdate: this.rawQuery.FOR_UPDATE,
			objectType: QueryClauseObjectType.FIELD_QUERY,
			dataType: this.getClauseDataType()
		}

		return <QueryField>this.getNonEntityQuery(
			this.rawQuery, queryField, null,
			queryUtils, fieldUtils, queryRelationManager)
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
