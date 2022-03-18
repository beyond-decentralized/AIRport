import { DI } from '@airport/di'
import {
	DbRelation,
	JoinType
} from '@airport/ground-control'
import { IQEntity, IQEntityInternal } from '../../../lingo/core/entity/Entity'
import { IQRelation, IQRepositoryEntityRelation } from '../../../lingo/core/entity/Relation'
import { JSONLogicalOperation } from '../../../lingo/core/operation/LogicalOperation'
import {
	AIRPORT_DATABASE,
	RELATION_MANAGER,
	APPLICATION_UTILS
} from '../../../tokens'
import { and } from '../operation/LogicalOperation'

/**
 * Created by Papa on 4/26/2016.
 */
export class QRelation<Entity, IQ extends IQEntity<Entity>>
	implements IQRelation<Entity, IQ> {

	constructor(
		private dbRelation: DbRelation,
		private parentQ: IQEntityInternal<any>
	) {
	}

	innerJoin(): IQ {
		return this.getNewQEntity(JoinType.INNER_JOIN)
	}

	leftJoin(): IQ {
		return this.getNewQEntity(JoinType.LEFT_JOIN)
	}

	getNewQEntity(joinType: JoinType): IQ {
		const [airDb, relationManager, applicationUtils] = DI.db()
			.getSync(AIRPORT_DATABASE, RELATION_MANAGER, APPLICATION_UTILS)
		const dbEntity = this.dbRelation.relationEntity

		const qEntityConstructor = applicationUtils.getQEntityConstructor(
			this.dbRelation.relationEntity, airDb)

		let newQEntity: IQEntityInternal<any> = new qEntityConstructor(
			dbEntity,
			relationManager.getNextChildJoinPosition(this.parentQ.__driver__),
			this.dbRelation,
			joinType
		)
		newQEntity.__driver__.parentJoinEntity = this.parentQ
		return newQEntity as any
	}

}

export class QRepositoryEntityRelation<Entity, IQ extends IQEntity<Entity>>
	extends QRelation<Entity, IQ>
	implements IQRepositoryEntityRelation<Entity, IQ> {

	equals(
		entity: Entity | IQRepositoryEntityRelation<Entity, IQ>
	): JSONLogicalOperation {
		let thisRelation = this as any
		let other = entity as any
		return and(
			thisRelation.actor.id.equals(other.actor.id),
			thisRelation.actorRecordId.equals(other.actorRecordId),
			thisRelation.id.equals(other.repository.id)
		)
	}

}
