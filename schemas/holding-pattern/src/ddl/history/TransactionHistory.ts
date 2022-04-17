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
	Transient
} from '@airport/air-control'
import {
	ATransactionHistory,
	SyncApplicationMap,
	TransactionType
} from '@airport/ground-control'
import { IRecordHistory } from '../../generated/history/recordhistory'
import { IOperationHistory } from '../../generated/history/operationhistory'
import { IRecordHistoryNewValue } from '../../generated/history/recordhistorynewvalue'
import { IRecordHistoryOldValue } from '../../generated/history/recordhistoryoldvalue'
import { IRepositoryTransactionHistory } from '../../generated/history/repositorytransactionhistory'
import { RepositoryTransactionHistory } from './RepositoryTransactionHistory'

export type TransactionHistoryNumberOfOperations = number;

/**
 * Created by Papa on 5/1/2017./
 */

export type TransactionHistoryId = number

@Entity()
@Table({ name: 'TRANSACTION_HISTORY' })
export class TransactionHistory
	implements ATransactionHistory {

	@GeneratedValue()
	@Id()
	@SequenceGenerator({ allocationSize: 100 })
	id: TransactionHistoryId

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
