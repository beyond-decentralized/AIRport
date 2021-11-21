import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	SequenceGenerator,
	Table,
}                                               from '@airport/air-control'
import {Actor}                                  from '../infrastructure/Actor'
import {Repository}                             from '../repository/Repository'
import {OperationHistory}                       from './OperationHistory'
import {RepositoryTransactionType}              from './RepositoryTransactionType'
import {RepoTransHistoryChangedRepositoryActor} from './RepoTransHistoryChangedRepositoryActor'
import {TransactionHistory}                     from './TransactionHistory'

/**
 * Created by Papa on 9/15/2016.
 */

export type RepositoryTransactionHistoryId = number;
export type RepositoryTransactionHistoryRemoteId = number;
export type RepositoryTransactionHistorySaveTimestamp = Date;
export type RepositoryTransactionHistoryBlockId = number;

@Entity()
@Table({name: 'REPOSITORY_TRANSACTION_HISTORY'})
export class RepositoryTransactionHistory {

	@GeneratedValue()
	@Id()
	@SequenceGenerator({allocationSize: 200})
	id: RepositoryTransactionHistoryId

	@ManyToOne()
	@JoinColumn({
		name: 'TRANSACTION_HISTORY_ID',
		referencedColumnName: 'ID', nullable: false
	})
	transactionHistory: TransactionHistory

	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_ID',
		referencedColumnName: 'ID', nullable: false
	})
	repository: Repository

	@OneToMany({mappedBy: 'repositoryTransactionHistory'})
	changedRepositoryActors: RepoTransHistoryChangedRepositoryActor[]

	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_ID', referencedColumnName: 'ID',
		nullable: false
	})
	actor: Actor

	@Column({name: 'SAVE_TIMESTAMP', nullable: false})
	saveTimestamp: RepositoryTransactionHistorySaveTimestamp

	@Column({name: 'REPOSITORY_TRANSACTION_TYPE', nullable: false})
	@DbString()
	repositoryTransactionType: RepositoryTransactionType = RepositoryTransactionType.LOCAL

	@Column({
		name: 'REPOSITORY_TRANSACTION_HISTORY_BLOCK_ID'
	})
	blockId: RepositoryTransactionHistoryBlockId

	@OneToMany({mappedBy: 'repositoryTransactionHistory'})
	operationHistory: OperationHistory[] = []


	constructor(
		data?: RepositoryTransactionHistory
	) {
		if (!data) {
			return
		}

		this.id                 = data.id
		this.transactionHistory = data.transactionHistory
		this.repository         = data.repository
		this.actor              = data.actor
		this.saveTimestamp      = data.saveTimestamp
		this.operationHistory   = data.operationHistory
	}


}
