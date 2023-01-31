import {
	JsonDelete,
	JSONEntityRelation
} from '@airport/ground-control'
import { IEntityAliases } from '../../../definition/core/entity/Aliases'
import {
	IQEntity
} from '../../../definition/core/entity/Entity'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { RawDelete } from '../../../definition/query/facade/Delete'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { EntityAliases } from '../../core/entity/Aliases'
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

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonDelete {
		return {
			DF: <JSONEntityRelation>(<IQEntityInternal><any>this.rawDelete.DELETE_FROM)
				.__driver__.getRelationJson(
					this.columnAliases,
					this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
					queryUtils, fieldUtils, relationManager),
			W: queryUtils.whereClauseToJSON(this.rawDelete.WHERE, this.columnAliases,
				this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet)
		}
	}
}
