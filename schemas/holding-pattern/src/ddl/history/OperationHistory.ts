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
}                                     from '@airport/air-control'
import {ChangeType}                   from '@airport/ground-control'
import {IApplicationEntity}                from '@airport/airspace'
import {SystemWideOperationId}        from '../common'
import {RecordHistory}                from './RecordHistory'
import {RepositoryTransactionHistory} from './RepositoryTransactionHistory'

/**
 * Created by Papa on 4/17/2017.
 */

export type OperationHistory_Id = number;
export type OperationHistory_OrderNumber = number;
export type OperationHistory_SystemWideOperationId = SystemWideOperationId;

/**
 * Marks a group of mutation history changes.
 */
@Entity()
@Table({name: 'REPOSITORY_OPERATION_HISTORY'})
export class OperationHistory {

	@GeneratedValue()
	@SequenceGenerator({allocationSize: 600})
	@Id()
	id: OperationHistory_Id

	@Column({name: 'ORDER_NUMBER', nullable: false})
	@DbNumber()
	orderNumber: OperationHistory_OrderNumber

	@Column({name: 'CHANGE_TYPE', nullable: false})
	@DbString()
	changeType: ChangeType

	// This field is local to the device only, when copied to new device this value is re-created
	@Column({name: 'SYSTEM_WIDE_OPERATION_ID', nullable: false})
	@DbNumber()
	systemWideOperationId: OperationHistory_SystemWideOperationId

	@ManyToOne()
	@JoinColumn({name: 'ENTITY_ID', referencedColumnName: 'ID', nullable: false})
	entity: IApplicationEntity

	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_TRANSACTION_HISTORY_ID', referencedColumnName: 'ID',
		nullable: false
	})
	repositoryTransactionHistory: RepositoryTransactionHistory

	@OneToMany({mappedBy: 'operationHistory'})
	recordHistory: RecordHistory[] = []

}
