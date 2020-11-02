import {
	Entity,
	GeneratedValue,
	Id
}                                             from '@airport/air-control'
import {
	Column,
	DbNumber,
	JoinColumn,
	ManyToOne
}                                             from '@airport/air-control'
import {Table}                                from '@airport/air-control'
import {Actor}                                from '../infrastructure/Actor'
import {Repository}                           from '../repository/Repository'
import {RepositoryTransactionHistory}         from './RepositoryTransactionHistory'
import {RepoTransHistoryChangedReferenceType} from './RepoTransHistoryChangedReferenceType'

export type RepoTransHistoryChangedRepositoryActorId = number;

@Entity()
@Table({name: 'REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS'})
export class RepoTransHistoryChangedRepositoryActor {

	@Id()
	@GeneratedValue()
	id: RepoTransHistoryChangedRepositoryActorId

	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_TRANSACTION_HISTORY_ID',
		referencedColumnName: 'ID', nullable: false
	})
	repositoryTransactionHistory: RepositoryTransactionHistory

	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_ID', referencedColumnName: 'ID',
		nullable: false
	})
	repository: Repository

	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_ID', referencedColumnName: 'ID',
		nullable: false
	})
	actor: Actor

	@Column({
		name: 'REFERENCE_TYPE',
		nullable: false
	})
	@DbNumber()
	referenceType: RepoTransHistoryChangedReferenceType

}
