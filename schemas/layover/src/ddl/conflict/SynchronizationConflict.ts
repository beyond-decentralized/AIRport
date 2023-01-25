import {
	Column,
	DbBoolean,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
} from '@airport/tarmaq-entity';
import { SynchronizationConflictValues } from './SynchronizationConflictValues';
import { ISynchronizationConflict, SynchronizationConflict_Acknowledged, SynchronizationConflict_Id, SynchronizationConflict_Type } from '@airport/ground-control';
import { RecordHistory, Repository } from '@airport/holding-pattern/dist/app/bundle';

@Entity()
@Table({ name: 'SYNCHRONIZATION_CONFLICT' })
export class SynchronizationConflict
	implements ISynchronizationConflict {

	@GeneratedValue()
	@Id()
	@DbNumber()
	@Column({ name: 'SYNCHRONIZATION_CONFLICT_LID' })
	_localId: SynchronizationConflict_Id;

	@DbString()
	type: SynchronizationConflict_Type;

	@DbBoolean()
	acknowledged: SynchronizationConflict_Acknowledged;

	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID'
	})
	repository: Repository;

	@ManyToOne()
	@JoinColumn({
		name: 'OVERWRITTEN_RECORD_HISTORY_LID',
		referencedColumnName: 'RECORD_HISTORY_LID'
	})
	overwrittenRecordHistory: RecordHistory;

	@ManyToOne()
	@JoinColumn({
		name: 'OVERWRITING_RECORD_HISTORY_LID',
		referencedColumnName: 'RECORD_HISTORY_LID'
	})
	overwritingRecordHistory: RecordHistory;

	@OneToMany({ mappedBy: 'synchronizationConflict' })
	values: SynchronizationConflictValues[];

}
