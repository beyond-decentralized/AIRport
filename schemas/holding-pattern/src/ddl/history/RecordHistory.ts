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
} from '@airport/air-control'
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

	// Actor is populated only if the record's Actor_Id
	// is different from RepositoryTransactionHistory Actor_Id
	// OR if the Actor who created the record is different
	// than than the Actor making the update/delete.
	// Actor is never populated for inserts (since the
	// record is guaranteed to be created by the same Actor)
	@ManyToOne()
	@JoinColumn({
		name: 'ACTOR_ID', referencedColumnName: 'ID'
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
