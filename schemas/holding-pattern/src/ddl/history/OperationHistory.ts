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
	Table
}                                      from "@airport/air-control";
import {
	CascadeType,
	ChangeType
}                    from "@airport/ground-control";
import {
	ISchemaEntity,
	ISchemaVersion
}                                      from "@airport/traffic-pattern";
import {IOperationHistory,}            from "../../generated/history/qoperationhistory";
import {IRecordHistory,}               from "../../generated/history/qrecordhistory";
import {IRepositoryTransactionHistory} from "../../generated/history/qrepositorytransactionhistory";

/**
 * Created by Papa on 4/17/2017.
 */

export type OperationHistoryId = number;
export type OperationHistoryOrderNumber = number;

/**
 * Marks a group of mutation history changes.
 */
@Entity()
@Table({name: "REPOSITORY_OPERATION_HISTORY"})
export class OperationHistory
	implements IOperationHistory {

	@GeneratedValue()
	@Id()
	id: OperationHistoryId;

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "REPOSITORY_TRANSACTION_HISTORY_ID", referencedColumnName: "ID"
	})
	repositoryTransactionHistory: IRepositoryTransactionHistory;

	@Column({name: "ORDER_NUMBER"})
	orderNumber: OperationHistoryOrderNumber;

	@Column({name: "CHANGE_TYPE"})
	@DbNumber()
	changeType: ChangeType;

	@ManyToOne()
	@JoinColumn({name: "SCHEMA_VERSION_ID", referencedColumnName: "ID"})
	schemaVersion: ISchemaVersion;

	@ManyToOne()
	@JoinColumns([
		{name: "SCHEMA_VERSION_ID"},
		{name: "ENTITY_INDEX", referencedColumnName: "INDEX"}
	])
	entity: ISchemaEntity;

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'operationHistory'})
	recordHistory: IRecordHistory[] = [];

}