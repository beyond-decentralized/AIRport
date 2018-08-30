import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	SequenceGenerator,
	Table,
	Transient
}                                from '@airport/air-control'
import {
	CascadeType,
	SyncColumnMap
}                                from '@airport/ground-control'
import {IOperationHistory,}      from '../../generated/history/qoperationhistory'
import {IRecordHistory,}         from '../../generated/history/qrecordhistory'
import {IRecordHistoryNewValue,} from '../../generated/history/qrecordhistorynewvalue'
import {IRecordHistoryOldValue}  from '../../generated/history/qrecordhistoryoldvalue'
import {IActor}                  from '../../generated/infrastructure/qactor'

/**
 * Entity Changes are always local-only, so a sequence for id will do.
 */

export type RecordHistoryId = number;
export type RecordHistoryActorRecordId = number;

@Entity()
@Table({
	name: 'REPOSITORY_RECORD_HISTORY',
	indexes: [{
		name: 'RCRD_HSTR_TO_OPRTN_HSTR_FX',
		columnList: [
			'REPOSITORY_OPERATION_HISTORY_ID'
		],
		unique: false
	}]
})
export class RecordHistory
	implements IRecordHistory {

	@Id()
	@GeneratedValue()
	@SequenceGenerator({allocationSize: 2000})
	id: RecordHistoryId

	@ManyToOne()
	@JoinColumn({name: 'ACTOR_ID', referencedColumnName: 'ID', nullable: false})
	actor: IActor

	@Column({name: 'ACTOR_RECORD_ID', nullable: false})
	@DbNumber()
	actorRecordId: RecordHistoryActorRecordId

	@ManyToOne()
	@JoinColumn({name: 'REPOSITORY_OPERATION_HISTORY_ID', referencedColumnName: 'ID',
		nullable: false})
	operationHistory: IOperationHistory


	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'recordHistory'})
	newValues: IRecordHistoryNewValue[] = []


	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'recordHistory'})
	oldValues: IRecordHistoryOldValue[] = []

	@Transient()
	tableColumnMap: SyncColumnMap

}