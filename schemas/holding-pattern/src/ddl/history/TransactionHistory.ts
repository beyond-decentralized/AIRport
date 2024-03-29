import {
	Column,
	DbNumber,
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
	IOperationHistory,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRecordHistoryOldValue,
	IRepositoryMember,
	IRepositoryMemberAcceptance,
	IRepositoryMemberInvitation,
	IRepositoryTransactionHistory,
	ITransactionHistory,
	SyncAllModifiedColumnsMap,
	TransactionHistory_LocalId,
	TransactionType
} from '@airport/ground-control'
import { RepositoryTransactionHistory } from './RepositoryTransactionHistory'

/**
 * Created by Papa on 5/1/2017./
 */
@Entity()
@Table({ name: 'TRANSACTION_HISTORY' })
export class TransactionHistory
	implements ITransactionHistory {

	@GeneratedValue()
	@Id()
	@SequenceGenerator({ allocationSize: 100 })
	@Column({ name: 'TRANSACTION_HISTORY_LID', nullable: false })
	@DbNumber()
	_localId: TransactionHistory_LocalId

	@Column({ name: 'TRANSACTION_TYPE', nullable: false })
	@DbString()
	transactionType: TransactionType

	@OneToMany({ mappedBy: 'transactionHistory' })
	repositoryTransactionHistories: RepositoryTransactionHistory[] = []

	@Transient()
	repositoryTransactionHistoryMap?: { [repositoryLid: number]: IRepositoryTransactionHistory } = {}

	@Transient()
	allModifiedColumnsMap?: SyncAllModifiedColumnsMap = new globalThis.SyncAllModifiedColumnsMap()

	@Transient()
	allOperationHistory?: IOperationHistory[] = []

	@Transient()
	allRecordHistory?: IRecordHistory[] = []

	@Transient()
	allRecordHistoryNewValues?: IRecordHistoryNewValue[] = []

	@Transient()
	allRecordHistoryOldValues?: IRecordHistoryOldValue[] = []

}
