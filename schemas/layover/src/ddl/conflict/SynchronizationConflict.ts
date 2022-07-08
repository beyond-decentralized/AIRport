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
} from '@airport/air-traffic-control';
import {
	IRecordHistory,
	IRepository
} from '@airport/holding-pattern';
import { SynchronizationConflict_Type } from './SynchronizationConflictType';
import { SynchronizationConflictValues } from './SynchronizationConflictValues';

export type SynchronizationConflict_Id = number;
export type SynchronizationConflict_Acknowledged = boolean;

@Entity()
@Table({ name: 'SYNCHRONIZATION_CONFLICT' })
export class SynchronizationConflict {

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
	repository: IRepository;

	@ManyToOne()
	@JoinColumn({
		name: 'OVERWRITTEN_RECORD_HISTORY_LID',
		referencedColumnName: 'RECORD_HISTORY_LID'
	})
	overwrittenRecordHistory: IRecordHistory;

	@ManyToOne()
	@JoinColumn({
		name: 'OVERWRITING_RECORD_HISTORY_LID',
		referencedColumnName: 'RECORD_HISTORY_LID'
	})
	overwritingRecordHistory: IRecordHistory;

	@OneToMany({ mappedBy: 'synchronizationConflict' })
	values: SynchronizationConflictValues[];

}
