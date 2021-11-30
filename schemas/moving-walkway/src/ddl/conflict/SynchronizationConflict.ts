import {
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
} from "@airport/air-control";
import {
	IRecordHistory,
	IRepository
} from "@airport/holding-pattern";
import { SynchronizationConflictType } from "./SynchronizationConflictType";
import { SynchronizationConflictValues } from "./SynchronizationConflictValues";

export type SynchronizationConflict_Id = number;

@Entity()
@Table({ name: "SYNCHRONIZATION_CONFLICT" })
export class SynchronizationConflict {

	@GeneratedValue()
	@Id()
	@DbNumber()
	id: SynchronizationConflict_Id;

	@ManyToOne()
	@JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID" })
	repository: IRepository;

	@ManyToOne()
	@JoinColumn({ name: "OVERWRITTEN_RECORD_HISTORY_ID", referencedColumnName: "ID" })
	overwrittenRecordHistory: IRecordHistory;

	@ManyToOne()
	@JoinColumn({ name: "OVERWRITING_RECORD_HISTORY_ID", referencedColumnName: "ID" })
	overwritingRecordHistory: IRecordHistory;

	@OneToMany({ mappedBy: "SYNCHRONIZATION_CONFLICT_ID" })
	values: SynchronizationConflictValues[];

	@DbString()
	type: SynchronizationConflictType;

}
