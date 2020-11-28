import {DI}               from '@airport/di'
import {
	DbRelation,
	JoinType
}                         from '@airport/ground-control'
import {IQEntityInternal} from '../../../lingo/core/entity/Entity'
import {
	AIR_DB,
	RELATION_MANAGER,
	SCHEMA_UTILS
} from '../../../tokens'

/**
 * Created by Papa on 4/26/2016.
 */

export function QRelation(
	dbRelation: DbRelation,
	parentQ: IQEntityInternal
) {
	this.dbRelation = dbRelation
	this.parentQ    = parentQ
}

QRelation.prototype.innerJoin = function <IQ extends IQEntityInternal>(): IQ {
	return this.getNewQEntity(JoinType.INNER_JOIN)
}

QRelation.prototype.leftJoin = function <IQ extends IQEntityInternal>(): IQ {
	return this.getNewQEntity(JoinType.LEFT_JOIN)
}

QRelation.prototype.getNewQEntity = function <IQ extends IQEntityInternal>(joinType: JoinType): IQ {
	const [airDb, relationManager, schemaUtils] = DI.db()
		.getSync(AIR_DB, RELATION_MANAGER, SCHEMA_UTILS)
	const dbEntity = this.dbRelation.property.entity

	const qEntityConstructor = schemaUtils.getQEntityConstructor(
			this.dbRelation.relationEntity, airDb)

	let newQEntity: IQEntityInternal       = new qEntityConstructor(
		dbEntity,
		relationManager.getNextChildJoinPosition(this.parentQ.__driver__),
		this.dbRelation,
		joinType
	)
	newQEntity.__driver__.parentJoinEntity = this.parentQ
	return <IQ>newQEntity
}
