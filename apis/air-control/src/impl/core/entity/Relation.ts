import {DI}               from '@airport/di'
import {
	DbRelation,
	JoinType,
	JSONEntityRelation,
	JSONRelation
}                         from '@airport/ground-control'
import {
	AIR_DB,
	SCHEMA_UTILS
} from '../../../tokens'
import {IAirportDatabase} from '../../../lingo/AirportDatabase'
import {
	IQEntityDriver,
	IQEntityInternal
}                         from '../../../lingo/core/entity/Entity'
import {ISchemaUtils}     from '../../../lingo/utils/SchemaUtils'

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
	const dbEntity = this.dbRelation.property.entity

	const qEntityConstructor = DI.db().getSync(SCHEMA_UTILS).getQEntityConstructor(
		this.dbRelation.relationEntity, DI.db().getSync(AIR_DB))

	let newQEntity: IQEntityInternal       = new qEntityConstructor(
		dbEntity,
		QRelation.getNextChildJoinPosition(this.parentQ.__driver__),
		this.dbRelation,
		joinType
	)
	newQEntity.__driver__.parentJoinEntity = this.parentQ
	return <IQ>newQEntity
}
