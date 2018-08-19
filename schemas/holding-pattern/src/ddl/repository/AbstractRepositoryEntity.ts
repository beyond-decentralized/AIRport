import {
	Column,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	MappedSuperclass
}                                   from '@airport/air-control'
import {IActor,}                    from '../../generated/infrastructure/qactor'
import {IAbstractRepositoryEntity,} from '../../generated/repository/qabstractrepositoryentity'
import {IRepository}                from '../../generated/repository/qrepository'

/**
 * Created by Papa on 2/17/2017.
 */

export type RepositoryEntityActorRecordId = number;

@MappedSuperclass()
export abstract class AbstractRepositoryEntity
	implements IAbstractRepositoryEntity {

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'REPOSITORY_ID', referencedColumnName: 'ID'})
	repository: IRepository

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'ACTOR_ID', referencedColumnName: 'ID'})
	actor: IActor

	@Id()
	@Column({name: 'ACTOR_RECORD_ID'})
	@GeneratedValue()
	actorRecordId: RepositoryEntityActorRecordId

	/*
		@OneToMany()
		@SubQuery((
			re: QRepositoryEntity,
			oh: QOperationHistory,
			join: Function
			db: IAirportDatabase,
			f: FunctionsAndOperators,
			opFields = DMO.getAllFieldsSelect(oh.__driver__.dbEntity),
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
					oh.schema.index.equals(re.__driver__.dbEntity.schema.index),
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