import {
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                                      from "@airport/air-control";
import {
	CascadeType,
}                                      from "@airport/ground-control";
import {
	IRecordHistory,
	IRepository
}                                      from "@airport/holding-pattern";
import {SynchronizationConflictType}   from "./SynchronizationConflictType";
import {SynchronizationConflictValues} from "./SynchronizationConflictValues";

export type SynchronizationConflictId = number;

@Entity()
@Table({name: "SYNCHRONIZATION_CONFLICT"})
export class SynchronizationConflict {

	@GeneratedValue()
	@Id()
	@DbNumber()
	id: SynchronizationConflictId;

	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: IRepository;

	@ManyToOne()
	@JoinColumn({name: "OVERWRITTEN_RECORD_HISTORY_ID", referencedColumnName: "ID"})
	overwrittenRecordHistory: IRecordHistory;

	@ManyToOne()
	@JoinColumn({name: "OVERWRITING_RECORD_HISTORY_ID", referencedColumnName: "ID"})
	overwritingRecordHistory: IRecordHistory;

	@OneToMany({cascade: CascadeType.ALL, mappedBy: "SYNCHRONIZATION_CONFLICT_ID"})
	values: SynchronizationConflictValues[];

	@DbNumber()
	type: SynchronizationConflictType;

}