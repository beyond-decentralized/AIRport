import { IRecordHistoryOldValue, RecordHistoryOldValue_ColumnIndex } from "@airport/ground-control";
import {
	Column,
	DbNumber,
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

/**
 * Currently, syncing databases are always SqLite dbs.  This means
 * we don't need to store types for values.  If a need arises type
 * specific FieldChange classes can always be added.  Having
 * VARCHAR and NUMBER should suffice for other db implementations.
 * NUMBER covers (dates, booleans and numbers).  Maybe REALs will
 * also be required.
 */
@Entity()
@Table({
	name: "REPOSITORY_RECORD_HISTORY_OLD_VALUES",
	// primaryKey: [
	// 	"REPOSITORY_RECORD_HISTORY_LID",
	// 	"COLUMN_INDEX"
	// ]
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
	@Column({ name: "COLUMN_INDEX", nullable: false })
	@DbNumber()
	columnIndex: RecordHistoryOldValue_ColumnIndex

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
