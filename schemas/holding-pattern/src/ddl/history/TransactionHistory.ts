import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	SequenceGenerator,
	Table,
	Transient
} from '@airport/air-control'
import {
	ATransactionHistory,
	SyncSchemaMap,
	TransactionType
}                                       from '@airport/ground-control'
import {IOperationHistory,}             from '../../generated/history/qoperationhistory'
import {IRecordHistory,}                from '../../generated/history/qrecordhistory'
import {IRecordHistoryNewValue}         from '../../generated/history/qrecordhistorynewvalue'
import {IRecordHistoryOldValue,}        from '../../generated/history/qrecordhistoryoldvalue'
import {IRepositoryTransactionHistory,} from '../../generated/history/qrepositorytransactionhistory'
import {ITransactionHistory}            from '../../generated/history/qtransactionhistory'

export type TransactionHistoryNumberOfOperations = number;

/**
 * Created by Papa on 5/1/2017.
 */

export type TransactionHistoryId = number

@Entity()
@Table({name: 'TRANSACTION_HISTORY'})
export class TransactionHistory
	implements ITransactionHistory,
	           ATransactionHistory {

	@GeneratedValue()
	@Id()
	@SequenceGenerator({allocationSize: 100})
	id: TransactionHistoryId

	@Column({name: 'TRANSACTION_TYPE'})
	@DbNumber()
	transactionType: TransactionType

	@OneToMany({mappedBy: 'repoTransHistory'})
	repositoryTransactionHistories: IRepositoryTransactionHistory[] = []

	@Transient()
	repoTransHistoryMap: { [repositoryId: number]: IRepositoryTransactionHistory } = {}

	@Transient()
	schemaMap: SyncSchemaMap = new SyncSchemaMap()

	@Transient()
	allOperationHistory: IOperationHistory[] = []

	@Transient()
	allRecordHistory: IRecordHistory[] = []

	@Transient()
	allRecordHistoryNewValues: IRecordHistoryNewValue[] = []

	@Transient()
	allRecordHistoryOldValues: IRecordHistoryOldValue[] = []

	@Transient()
	numberOfOperations: TransactionHistoryNumberOfOperations = 0

}