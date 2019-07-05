import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	Table
}               from '@airport/air-control'
import {
	ColumnIndex,
	SchemaIndex,
	TableIndex
}               from '@airport/ground-control'
import {Domain} from '@airport/territory'

export type SequenceIncrementBy = number
export type SequenceCurrentValue = number

@Entity()
@Table({name: 'SEQUENCES'})
export class Sequence {

	@Id()
	@Column({name: 'SCHEMA_INDEX', nullable: false})
	@DbNumber()
	schemaIndex: SchemaIndex

	@Id()
	@Column({name: 'TABLE_INDEX', nullable: false})
	@DbNumber()
	tableIndex: TableIndex

	@Id()
	@Column({name: 'COLUMN_INDEX', nullable: false})
	@DbNumber()
	columnIndex: ColumnIndex

	@Column({name: 'SEQUENCE_INCREMENT_BY', nullable: false})
	incrementBy: SequenceIncrementBy

	@Column({name: 'CURRENT_VALUE', nullable: false})
	currentValue: SequenceCurrentValue

}
