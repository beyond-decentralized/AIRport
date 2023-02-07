import {
	QueryDelete,
	QueryEntityRelation
} from '@airport/ground-control'
import { IEntityAliases } from '../../../definition/core/entity/IAliases'
import {
	IQEntity
} from '../../../definition/core/entity/IQEntity'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { RawDelete } from '../../../definition/query/facade/RawDelete'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { EntityAliases } from '../../core/entity/aliases'
import { AbstractQuery } from './AbstractQuery'

/**
 * Created by Papa on 10/2/2016.
 */

export class Delete<IQE extends IQEntity>
	extends AbstractQuery {

	constructor(
		public rawDelete: RawDelete<IQE>,
		entityAliases: IEntityAliases = new EntityAliases(),
	) {
		super(entityAliases,
			entityAliases.getNewFieldColumnAliases())
	}

	toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryDelete {
		return {
			DELETE_FROM: <QueryEntityRelation>(<IQEntityInternal><any>this.rawDelete.DELETE_FROM)
				.__driver__.getQueryRelation(
					this.columnAliases,
					this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
					queryUtils, fieldUtils, queryRelationManager),
			WHERE: queryUtils.whereClauseToQueryOperation(this.rawDelete.WHERE, this.columnAliases,
				this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet)
		}
	}
}
