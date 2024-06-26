import { QuerySheet, Repository_GUID, Repository_LocalId } from '@airport/ground-control'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IReadQuery } from '../../../definition/query/facade/RawReadQuery'
import { RawOneTimeSheetQuery } from '../../../definition/query/facade/RawSheetQuery'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { EntityAliases } from '../../core/entity/Aliases'
import { QField } from '../../core/field/QField'
import {
	DistinguishableQuery,
	NON_ENTITY_SELECT_ERROR_MESSAGE,
} from './DistinguishableQuery'

/**
 * Created by Papa on 10/23/2016.
 */

export class SheetQuery
	extends DistinguishableQuery
	implements IReadQuery {

	constructor(
		public rawQuery: RawOneTimeSheetQuery,
		trackedRepoGUIDSet?: Set<Repository_GUID>,
		trackedRepoLocalIdSet?: Set<Repository_LocalId>,
	) {
		super(new EntityAliases(), trackedRepoGUIDSet, trackedRepoLocalIdSet)
	}

	rawToQueryNonDistinctSelectClause(
		rawSelect: any[],
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): any {
		if (!(rawSelect instanceof Array)) {
			throw new Error(`Flat Queries an array of fields in SELECT clause.`)
		}
		return rawSelect.map((selectField) => {
			if (!(selectField instanceof QField)) {
				throw new Error(NON_ENTITY_SELECT_ERROR_MESSAGE)
			}
			this.columnAliases.entityAliases.getNextAlias(
				selectField.q.__driver__.getRootJoinEntity())
			const queryFieldClause = selectField.toQueryFragment(
				this.columnAliases, true,
				this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
				queryUtils, fieldUtils, queryRelationManager)

			return queryFieldClause
		})
	}

	toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QuerySheet {
		let select = this.rawToQuerySelectClause(
			this.rawQuery.SELECT,
			queryUtils, fieldUtils, queryRelationManager)

		let querySheet: QuerySheet = {
			SELECT: select,
			forUpdate: this.rawQuery.FOR_UPDATE
		}

		return <QuerySheet>this.getNonEntityQuery(
			this.rawQuery, querySheet, null,
			queryUtils, fieldUtils, queryRelationManager)
	}

}
