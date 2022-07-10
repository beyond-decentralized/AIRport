import {
	Column,
	DbAny,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/tarmaq-entity";
import { RecordHistory } from './RecordHistory'

/**
 * Created by Papa on 9/15/2016.
 */


export type RecordHistoryNewValueColumnIndex = number;
export type RecordHistoryNewValueNewValue = any;

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
	name: "REPOSITORY_RECORD_HISTORY_NEW_VALUES",
	// primaryKey: [
	// 	"REPOSITORY_RECORD_HISTORY_LID",
	// 	"COLUMN_INDEX"
	// ]
})
export class RecordHistoryNewValue {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "REPOSITORY_RECORD_HISTORY_LID",
		referencedColumnName: "RECORD_HISTORY_LID", nullable: false
	})
	recordHistory: RecordHistory;

	@Id()
	@Column({ name: "COLUMN_INDEX", nullable: false })
	@DbNumber()
	columnIndex: RecordHistoryNewValueColumnIndex;

	@Column({ name: "NEW_VALUE" })
	@DbAny()
	newValue: RecordHistoryNewValueNewValue;

}