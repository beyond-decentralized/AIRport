import {
	Column,
	DbNumber,
	Entity,
	Id,
	Table
} from '@airport/tarmaq-entity'
import {
	DbColumn_Index,
	DbApplication_Index,
	DbEntity_TableIndex,
	SequenceIncrementBy,
	SequenceCurrentValue,
	DbSequence
} from '@airport/ground-control'

@Entity()
@Table({ name: 'SEQUENCES' })
export class Sequence
	implements DbSequence {

	@Id()
	@Column({ name: 'DB_APPLICATION_INDEX', nullable: false })
	@DbNumber()
	applicationIndex: DbApplication_Index

	@Id()
	@Column({ name: 'TABLE_INDEX', nullable: false })
	@DbNumber()
	entityIndex: DbEntity_TableIndex

	@Id()
	@Column({ name: 'COLUMN_INDEX', nullable: false })
	@DbNumber()
	columnIndex: DbColumn_Index

	@Column({ name: 'SEQUENCE_INCREMENT_BY', nullable: false })
	@DbNumber()
	incrementBy: SequenceIncrementBy

	@Column({ name: 'CURRENT_VALUE', nullable: false })
	@DbNumber()
	currentValue: SequenceCurrentValue

}
