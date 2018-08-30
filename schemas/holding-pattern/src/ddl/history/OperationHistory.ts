import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	OneToMany,
	SequenceGenerator,
	Table
}                                      from '@airport/air-control'
import {
	CascadeType,
	ChangeType
}                                      from '@airport/ground-control'
import {
	ISchemaEntity,
	ISchemaVersion
}                                      from '@airport/traffic-pattern'
import {IOperationHistory,}            from '../../generated/history/qoperationhistory'
import {IRecordHistory,}               from '../../generated/history/qrecordhistory'
import {IRepositoryTransactionHistory} from '../../generated/history/qrepositorytransactionhistory'

/**
 * Created by Papa on 4/17/2017.
 */

export type OperationHistoryId = number;
export type OperationHistoryOrderNumber = number;

/**
 * Marks a group of mutation history changes.
 */
@Entity()
@Table({name: 'REPOSITORY_OPERATION_HISTORY'})
export class OperationHistory
	implements IOperationHistory {

	@GeneratedValue()
	@SequenceGenerator({allocationSize: 600})
	@Id()
	id: OperationHistoryId

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_TRANSACTION_HISTORY_ID', referencedColumnName: 'ID',
		nullable: false
	})
	repositoryTransactionHistory: IRepositoryTransactionHistory

	@Column({name: 'ORDER_NUMBER', nullable: false})
	orderNumber: OperationHistoryOrderNumber

	@Column({name: 'CHANGE_TYPE', nullable: false})
	@DbNumber()
	changeType: ChangeType

	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false})
	schemaVersion: ISchemaVersion

	@ManyToOne()
	@JoinColumns([
		{name: 'SCHEMA_VERSION_ID', nullable: false},
		{name: 'ENTITY_INDEX', referencedColumnName: 'INDEX', nullable: false}
	])
	entity: ISchemaEntity

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'operationHistory'})
	recordHistory: IRecordHistory[] = []

}