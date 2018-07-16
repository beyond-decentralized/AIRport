import {
	ColumnIndex,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                                 from "@airport/air-control";
import {ISynchronizationConflict} from "../../generated/conflict/qsynchronizationconflict";

@Entity()
@Table({name: "SYNCHRONIZATION_CONFLICT_VALUES"})
export class SynchronizationConflictValues {

	@Id()
	@ManyToOne()
	@JoinColumn({name: "SYNCHRONIZATION_CONFLICT_ID", referencedColumnName: "ID"})
	synchronizationConflict: ISynchronizationConflict;

	@Id()
	@DbNumber()
	columnIndex: ColumnIndex;

}