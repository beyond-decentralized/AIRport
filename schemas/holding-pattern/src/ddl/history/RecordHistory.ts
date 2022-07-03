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
import { Actor } from '../infrastructure/Actor';
import { OperationHistory } from './OperationHistory';
import { RecordHistoryNewValue } from './RecordHistoryNewValue';
import { RecordHistoryOldValue } from './RecordHistoryOldValue';

/**
 * Entity Changes are always local-only, so a sequence for id will do.
 */

export type RecordHistory_LocalId = number;
export type RecordHistory_ActorRecordId = number;

@Entity()
@Table({
	name: 'REPOSITORY_RECORD_HISTORY',
	indexes: [{
		name: 'RCRD_HSTR_TO_OPRTN_HSTR_FX',
		columnList: [
			'REPOSITORY_OPERATION_HISTORY_LID'
		],
		unique: false
	}]
})
export class RecordHistory {

	@Id()
	@GeneratedValue()
	@SequenceGenerator({ allocationSize: 2000 })
	@Column({ name: 'RECORD_HISTORY_LID' })
	_localId: RecordHistory_LocalId

	@Column({ name: 'ACTOR_RECORD_ID', nullable: false })
	@DbNumber()
	_actorRecordId: RecordHistory_ActorRecordId

	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_LID',
		referencedColumnName: 'ACTOR_LID', nullable: false
	})
	actor: Actor

	@ManyToOne()
	@JoinColumn({
		name: 'OPERATION_HISTORY_LID',
		referencedColumnName: 'OPERATION_HISTORY_LID',
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
