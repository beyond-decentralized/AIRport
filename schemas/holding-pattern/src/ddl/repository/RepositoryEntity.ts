import {
	Column,
	DbNumber,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	MappedSuperclass
} from '@airport/air-traffic-control'
import {
	encodeId,
	setId
} from '@airport/aviation-communication'
import { Actor } from '../infrastructure/Actor'
import { SystemWideOperationId } from '../common'
import { Repository } from './Repository'

/**
 * Created by Papa on 2/17/2017.
 */
export type RepositoryEntity_ActorRecordId = number
export type RepositoryEntity_SystemWideOperationId = SystemWideOperationId

@MappedSuperclass()
export abstract class RepositoryEntity {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_ID', referencedColumnName: 'ID',
		nullable: false
	})
	repository: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_ID', referencedColumnName: 'ID',
		nullable: false
	})
	actor: Actor

	@Id()
	@Column({ name: 'ACTOR_RECORD_ID', nullable: false })
	@GeneratedValue()
	actorRecordId: RepositoryEntity_ActorRecordId

	@Column({ name: 'AGE_SUITABILITY', nullable: false })
	@DbNumber()
	ageSuitability: number

	// This field is local to the device only, when copied to new device this value is re-created
	// It is needed for bulk updates of repository records, where there is now way to find out
	// what the new field values are (like 'UPDATE ... SET a = (SUBSELECT)'). It is used as
	// a marker to find the new values after the update (and before saving them to history).
	@Column({ name: 'SYSTEM_WIDE_OPERATION_ID', nullable: false })
	systemWideOperationId: RepositoryEntity_SystemWideOperationId

	// A record may actually be copied from another repository
	// via a @ManytoOne dependency.  If that is the case
	// the link to the original repository ID is saved
	// here
	@ManyToOne()
	@JoinColumn({
		name: 'ORIGINAL_REPOSITORY_ID', referencedColumnName: 'ID'
	})
	originalRepository: Repository

	@ManyToOne()
	@JoinColumn({
		name: 'ORIGINAL_ACTOR_ID', referencedColumnName: 'ID'
	})
	originalActor: Actor

	@Column({ name: 'ORIGINAL_ACTOR_RECORD_ID' })
	originalActorRecordId: RepositoryEntity_ActorRecordId

	// get id(): string {
	// 	return encodeId(this)
	// }

	// set id(
	// 	idString: string
	// ) {
	// 	setId(idString, this)
	// }

	/*
		@OneToMany()
		@SubQuery((
			re: QRepositoryEntity,
			oh: QOperationHistory,
			join: Function
			db: IAirportDatabase,
			f: FunctionsAndOperators,
			opFields = DUO.getAllFieldsSelect(oh.__driver__.dbEntity),
			rh: QRecordHistory,
			rth: QRepositoryTransactionHistory
		) =>
			join({
				select: {
					...opFields,
					recordHistory: {
						id: Y,
						actorRecordId: Y,
						oldValues: {}
					},
					repositoryTransactionHistory: {
						syncTimestamp: Y,
						saveTimestamp: Y,
						syncStatus: Y,
						transactionHistory: {}
					}
				},
				from: [
					rh = oh.recordHistory.innerJoin(),
					rth = oh.repositoryTransactionHistory.innerJoin(),
				],
				where: f.and(
					rh.actorRecordId.equals(re.actorRecordId),
					oh.application.index.equals(re.__driver__.dbEntity.application.index),
					oh.entity.index.equals(re.__driver__.dbEntity.table.index),
					rth.repository.id.equals(re.repository.id),
					rth.actor.id.equals(re.actor.id)
				),
				orderBy: [
					rth.syncTimestamp.asc(),
					rth.saveTimestamp.asc(),
					oh.orderNumber.asc()
				]
			}).on((history: OperationHistory) => f.and(
				re.repository.id.equals(history.repositoryTransactionHistory.repository.id),
				re.actor.id.equals(history.repositoryTransactionHistory.actor.id),
				re.actorRecordId.equals(history.recordHistory.actorRecordId),
			))
		)
		history: OperationHistory[];
	*/

}
