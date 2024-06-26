import { IRecordHistoryNewValue, RecordHistoryNewValue_ColumnIndex, RecordHistoryNewValue_NewValue } from "@airport/ground-control";
import {
	Column,
	DbAny,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
} from "@airport/tarmaq-entity";
import { RecordHistory } from './RecordHistory'
import { CurrentValueMapping } from "./CurrentValueMapping";

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
	name: "REPOSITORY_RECORD_HISTORY_NEW_VALUES"
})
export class RecordHistoryNewValue
	implements IRecordHistoryNewValue {

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
	columnIndex: RecordHistoryNewValue_ColumnIndex

	@Column({ name: "NEW_VALUE" })
	@DbAny()
	newValue?: RecordHistoryNewValue_NewValue

	@OneToMany({ mappedBy: 'value'})
	currentValueMappings: CurrentValueMapping[]

}