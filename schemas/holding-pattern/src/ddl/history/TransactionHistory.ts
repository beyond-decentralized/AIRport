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
	SyncApplicationMap,
	TransactionHistory_LocalId,
	TransactionType
} from '@airport/ground-control'
import { IRecordHistory } from '../../generated/entity/history/IRecordHistory'
import { IOperationHistory } from '../../generated/entity/history/IOperationHistory'
import { IRecordHistoryNewValue } from '../../generated/entity/history/IRecordHistoryNewValue'
import { IRecordHistoryOldValue } from '../../generated/entity/history/IRecordHistoryOldValue'
import { IRepositoryTransactionHistory } from '../../generated/entity/history/IRepositoryTransactionHistory'
import { RepositoryTransactionHistory } from './RepositoryTransactionHistory'

/**
 * Created by Papa on 5/1/2017./
 */
@Entity()
@Table({ name: 'TRANSACTION_HISTORY' })
export class TransactionHistory {

	@GeneratedValue()
	@Id()
	@SequenceGenerator({ allocationSize: 100 })
	@Column({ name: 'TRANSACTION_HISTORY_LID', nullable: false })
	@DbNumber()
	_localId: TransactionHistory_LocalId

	@Column({ name: 'TRANSACTION_TYPE', nullable: false })
	@DbString()
	transactionType?: TransactionType

	@OneToMany({ mappedBy: 'transactionHistory' })
	repositoryTransactionHistories?: RepositoryTransactionHistory[]

	@Transient()
	repositoryTransactionHistoryMap?: { [repositoryId: number]: IRepositoryTransactionHistory }

	@Transient()
	applicationMap?: SyncApplicationMap = new globalThis.SyncApplicationMap()

	@Transient()
	allOperationHistory?: IOperationHistory[] = []

	@Transient()
	allRecordHistory?: IRecordHistory[] = []

	@Transient()
	allRecordHistoryNewValues?: IRecordHistoryNewValue[] = []

	@Transient()
	allRecordHistoryOldValues?: IRecordHistoryOldValue[] = []

}
