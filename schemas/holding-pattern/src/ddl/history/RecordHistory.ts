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
} from '@airport/air-traffic-control'
import {
	SyncColumnMap
} from '@airport/ground-control'
import {
	Actor,
	OperationHistory,
	RecordHistoryNewValue,
	RecordHistoryOldValue
} from '../..'
import { Repository } from '../ddl';

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
export class RecordHistory {

	@Id()
	@GeneratedValue()
	@SequenceGenerator({ allocationSize: 2000 })
	id: RecordHistoryId

	@Column({ name: 'ACTOR_RECORD_ID', nullable: false })
	@DbNumber()
	actorRecordId: RecordHistoryActorRecordId

	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_ID', referencedColumnName: 'ID', nullable: false
	})
	actor: Actor

	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_OPERATION_HISTORY_ID', referencedColumnName: 'ID',
		nullable: false
	})
	operationHistory: OperationHistory

	@OneToMany({ mappedBy: 'recordHistory' })
	newValues: RecordHistoryNewValue[] = []

	@OneToMany({ mappedBy: 'recordHistory' })
	oldValues: RecordHistoryOldValue[] = []

	@Transient()
	tableColumnMap: SyncColumnMap

}
