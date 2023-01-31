import {
	JSONEntityRelation,
	JsonEntityUpdateColumns,
	JsonUpdate
} from '@airport/ground-control'
import { IEntityAliases } from '../../../definition/core/entity/Aliases'
import {
	IQEntity
} from '../../../definition/core/entity/Entity'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'
import { IRelationManager } from '../../../definition/core/entity/IRelationManager'
import { AbstractRawUpdate } from '../../../definition/query/facade/Update'
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

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonUpdate<JsonEntityUpdateColumns> {
		return {
			U: <JSONEntityRelation>(<IQEntityInternal><any>this.rawUpdate.UPDATE)
				.__driver__.getRelationJson(this.columnAliases,
					this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
					queryUtils, fieldUtils, relationManager),
			S: this.setToJSON(this.rawUpdate.SET,
				queryUtils, fieldUtils, relationManager),
			W: queryUtils.whereClauseToJSON(
				this.rawUpdate.WHERE, this.columnAliases,
				this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet)
		}
	}


	protected abstract setToJSON(
		set: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonEntityUpdateColumns;

}
