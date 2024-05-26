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
} from '@airport/tarmaq-entity'
import {
	ActorRecordId,
	IRecordHistory,
	RecordHistory_LocalId,
	SyncColumnMap
} from '@airport/ground-control'
import { Actor } from '../infrastructure/Actor';
import { OperationHistory } from './OperationHistory';
import { RecordHistoryNewValue } from './RecordHistoryNewValue';
import { RecordHistoryOldValue } from './RecordHistoryOldValue';

@Entity()
@Table({
	name: 'REPOSITORY_RECORD_HISTORY',
	indexes: [{
		name: 'RCRD_HSTR_TO_OPRTN_HSTR_FX',
		columnList: [
			'OPERATION_HISTORY_LID'
		],
		unique: false
	}]
})
export class RecordHistory
	implements IRecordHistory {

	@Id()
	@GeneratedValue()
	@SequenceGenerator({ allocationSize: 2000 })
	@Column({ name: 'RECORD_HISTORY_LID', nullable: false })
	@DbNumber()
	_localId: RecordHistory_LocalId

	@Column({ name: 'ACTOR_RECORD_ID', nullable: false })
	@DbNumber()
	_actorRecordId: ActorRecordId

	@ManyToOne()
	@JoinColumn({ name: 'ACTOR_LID', nullable: false })
	actor: Actor

	@ManyToOne()
	@JoinColumn({ name: 'OPERATION_HISTORY_LID', nullable: false })
	operationHistory: OperationHistory

	@OneToMany({ mappedBy: 'recordHistory' })
	newValues?: RecordHistoryNewValue[] = []

	@OneToMany({ mappedBy: 'recordHistory' })
	oldValues?: RecordHistoryOldValue[] = []

	@Transient()
	tableColumnMap?: SyncColumnMap

}
