import { IRecordHistoryOldValue } from "@airport/ground-control";
import {
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
} from "@airport/tarmaq-entity";
import { RecordHistory } from './RecordHistory'
import { RecordHistoryNewValue } from "./RecordHistoryNewValue";

/**
 * Created by Papa on 9/15/2016.
 */
@Entity()
@Table({
	name: "REPOSITORY_RECORD_HISTORY_OLD_VALUES"
})
export class RecordHistoryOldValue
	implements IRecordHistoryOldValue {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "REPOSITORY_RECORD_HISTORY_LID",
		referencedColumnName: "RECORD_HISTORY_LID", nullable: false
	})
	recordHistory: RecordHistory

	@Id()
	@ManyToOne()
	@JoinColumns([{
		name: "OLD_VALUE_REPOSITORY_RECORD_HISTORY_LID",
		referencedColumnName: "REPOSITORY_RECORD_HISTORY_LID",
		nullable: false
	}, {
		name: "COLUMN_INDEX", nullable: false
	}])
	oldValue: RecordHistoryNewValue

}
