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
	Table
} from '@airport/tarmaq-entity'
import { ChangeType, IOperationHistory, OperationHistory_LocalId, OperationHistory_OrderNumber, SystemWideOperationId } from '@airport/ground-control'
import { DdlEntity } from '@airport/airspace/dist/app/bundle'
import { RecordHistory } from './RecordHistory'
import { RepositoryTransactionHistory } from './RepositoryTransactionHistory'
import { Actor } from '../infrastructure/Actor'

/**
 * Created by Papa on 4/17/2017.
 */

/**
 * Marks a group of mutation history changes.
 */
@Entity()
@Table({ name: 'REPOSITORY_OPERATION_HISTORY' })
export class OperationHistory
	implements IOperationHistory {

	@GeneratedValue()
	@SequenceGenerator({ allocationSize: 600 })
	@Id()
	@Column({ name: 'OPERATION_HISTORY_LID', nullable: false })
	@DbNumber()
	_localId: OperationHistory_LocalId

	@Column({ name: 'ORDER_NUMBER', nullable: false })
	@DbNumber()
	orderNumber: OperationHistory_OrderNumber

	@Column({ name: 'CHANGE_TYPE', nullable: false })
	@DbString()
	changeType: ChangeType

	// This field is local to the device only, when copied to new device this value is re-created
	@Column({ name: 'SYSTEM_WIDE_OPERATION_LID' })
	@DbNumber()
	systemWideOperationId?: SystemWideOperationId

	// Moved from RepositoryTransactionHistory because those get
	// combined into parentRepsitoryTransactionHistory that
	// (together) may have been performed by multiple Actors
	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_LID',
		referencedColumnName: 'ACTOR_LID',
		nullable: false
	})
	actor: Actor

	@ManyToOne()
	@JoinColumn({
		name: 'DB_ENTITY_LID',
		referencedColumnName: 'DB_ENTITY_LID', nullable: false
	})
	entity: DdlEntity

	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_TRANSACTION_HISTORY_LID',
		referencedColumnName: 'REPOSITORY_TRANSACTION_HISTORY_LID',
		nullable: false
	})
	repositoryTransactionHistory: RepositoryTransactionHistory

	@OneToMany({ mappedBy: 'operationHistory' })
	recordHistory: RecordHistory[] = []

}
