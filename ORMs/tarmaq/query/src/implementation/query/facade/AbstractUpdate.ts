import {
	QueryEntityRelation,
	QueryUpdateColumns,
	QueryUpdate
} from '@airport/ground-control'
import { IEntityAliases } from '../../../definition/core/entity/IAliases'
import {
	IQEntity
} from '../../../definition/core/entity/IQEntity'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { AbstractRawUpdate } from '../../../definition/query/facade/RawUpdate'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { EntityAliases } from '../../core/entity/Aliases'
import { AbstractQuery } from './AbstractQuery'

export abstract class AbstractUpdate<IQE extends IQEntity, ARE extends AbstractRawUpdate<IQE>>
	extends AbstractQuery {

	protected constructor(
		public rawUpdate: ARE,
		entityAliases: IEntityAliases = new EntityAliases(),
	) {
		super(entityAliases,
			entityAliases.getNewFieldColumnAliases())
	}

	toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryUpdate<QueryUpdateColumns> {
		return {
			UPDATE: <QueryEntityRelation>(<IQEntityInternal><any>this.rawUpdate.UPDATE)
				.__driver__.getQueryRelation(this.columnAliases,
					this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
					queryUtils, fieldUtils, queryRelationManager),
			SET: this.rawToQuerySetClause(this.rawUpdate.SET,
				queryUtils, fieldUtils, queryRelationManager),
			WHERE: queryUtils.whereClauseToQueryOperation(
				this.rawUpdate.WHERE, this.columnAliases,
				this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet)
		}
	}


	protected abstract rawToQuerySetClause(
		set: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryUpdateColumns;

}
