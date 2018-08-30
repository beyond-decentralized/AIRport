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

export type SequenceId = number
export type SequenceIncrementBy = number

@Entity()
@Table({name: 'SEQUENCES'})
export class Sequence {

	@Id()
	@GeneratedValue()
	id: SequenceId

	@Column({name: 'SCHEMA_INDEX', nullable: false})
	@DbNumber()
	schemaIndex: SchemaIndex

	@Column({name: 'TABLE_INDEX', nullable: false})
	@DbNumber()
	tableIndex: TableIndex

	@Column({name: 'COLUMN_INDEX', nullable: false})
	@DbNumber()
	columnIndex: ColumnIndex

	@Column({name: 'SEQUENCE_INCREMENT_BY', nullable: false})
	incrementBy: SequenceIncrementBy

}