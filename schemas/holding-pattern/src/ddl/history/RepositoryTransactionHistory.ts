import {
	Column,
	DbBoolean,
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
} from '@airport/air-traffic-control'
import { Repository } from '../repository/Repository'
import { OperationHistory } from './OperationHistory'
import { RepositoryTransactionType } from './RepositoryTransactionType'
import { TransactionHistory } from './TransactionHistory'

/**
 * Created by Papa on 9/15/2016.
 */

export type RepositoryTransactionHistory_LocalId = number;
export type RepositoryTransactionHistory_IsRepositoryCreation = boolean;
export type RepositoryTransactionHistory_BlockId = number;
export type RepositoryTransactionHistory_SaveTimestamp = number;
export type RepositoryTransactionHistory_SyncTimestamp = number;
export type RepositoryTransactionHistory_GUID = string;

@Entity()
@Table({ name: 'REPOSITORY_TRANSACTION_HISTORY' })
export class RepositoryTransactionHistory {

	@GeneratedValue()
	@Id()
	@SequenceGenerator({ allocationSize: 200 })
	@Column({ name: 'REPOSITORY_TRANSACTION_HISTORY_LID' })
	_localId: RepositoryTransactionHistory_LocalId

	@Column({ name: 'REPOSITORY_TRANSACTION_TYPE', nullable: false })
	@DbString()
	repositoryTransactionType: RepositoryTransactionType = RepositoryTransactionType.LOCAL

	@Column({ name: 'SAVE_TIMESTAMP', nullable: false })
	@DbNumber()
	saveTimestamp: RepositoryTransactionHistory_SaveTimestamp

	@Column({ name: 'SYNC_TIMESTAMP' })
	@DbNumber()
	syncTimestamp: RepositoryTransactionHistory_SyncTimestamp

	@Column({ name: "GUID", nullable: false })
	@DbString()
	GUID: RepositoryTransactionHistory_GUID

	@Column({ name: "IS_REPOSITORY_CREATION", nullable: false })
	@DbBoolean()
	isRepositoryCreation: RepositoryTransactionHistory_IsRepositoryCreation

	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID', nullable: false
	})
	repository: Repository

	@ManyToOne()
	@JoinColumn({
		name: 'TRANSACTION_HISTORY_LID',
		referencedColumnName: 'TRANSACTION_HISTORY_LID', nullable: false
	})
	transactionHistory: TransactionHistory

	@OneToMany({ mappedBy: 'repositoryTransactionHistory' })
	operationHistory: OperationHistory[] = []

	constructor(
		data?: RepositoryTransactionHistory
	) {
		if (!data) {
			return
		}

		this.id = data.id
		this.transactionHistory = data.transactionHistory
		this.repository = data.repository
		this.saveTimestamp = data.saveTimestamp
		this.operationHistory = data.operationHistory
	}


}
