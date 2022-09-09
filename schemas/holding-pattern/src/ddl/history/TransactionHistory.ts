import {
	Column,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	SequenceGenerator,
	Table,
	Transient
} from '@airport/tarmaq-entity'
import {
	ATransactionHistory,
	SyncApplicationMap,
	TransactionType
} from '@airport/ground-control'
import { IRecordHistory } from '../../generated/entity/history/IRecordHistory'
import { IOperationHistory } from '../../generated/entity/history/IOperationHistory'
import { IRecordHistoryNewValue } from '../../generated/entity/history/IRecordHistoryNewValue'
import { IRecordHistoryOldValue } from '../../generated/entity/history/IRecordHistoryOldValue'
import { IRepositoryTransactionHistory } from '../../generated/entity/history/IRepositoryTransactionHistory'
import { RepositoryTransactionHistory } from './RepositoryTransactionHistory'

export type TransactionHistoryNumberOfOperations = number;

/**
 * Created by Papa on 5/1/2017./
 */

export type TransactionHistory_LocalId = number

@Entity()
@Table({ name: 'TRANSACTION_HISTORY' })
export class TransactionHistory
	implements ATransactionHistory {

	@GeneratedValue()
	@Id()
	@SequenceGenerator({ allocationSize: 100 })
	@Column({ name: 'TRANSACTION_HISTORY_LID' })
	_localId: TransactionHistory_LocalId

	@Column({ name: 'TRANSACTION_TYPE', nullable: false })
	@DbString()
	transactionType: TransactionType

	@OneToMany({ mappedBy: 'transactionHistory' })
	repositoryTransactionHistories: RepositoryTransactionHistory[] = []

	@Transient()
	repositoryTransactionHistoryMap: { [repositoryId: number]: IRepositoryTransactionHistory } = {}

	@Transient()
	applicationMap: SyncApplicationMap = new SyncApplicationMap()

	@Transient()
	allOperationHistory: IOperationHistory[] = []

	@Transient()
	allRecordHistory: IRecordHistory[] = []

	@Transient()
	allRecordHistoryNewValues: IRecordHistoryNewValue[] = []

	@Transient()
	allRecordHistoryOldValues: IRecordHistoryOldValue[] = []

}
