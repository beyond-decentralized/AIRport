import {
	Column,
	DbNumber,
	Entity,
	Id,
	Table
} from '@airport/tarmaq-entity'
import {
	ApplicationColumn_Index,
	Application_Index,
	ApplicationEntity_TableIndex,
	SequenceIncrementBy,
	SequenceCurrentValue,
	DbSequence
} from '@airport/ground-control'

@Entity()
@Table({ name: 'SEQUENCES' })
export class Sequence
	implements DbSequence {

	@Id()
	@Column({ name: 'APPLICATION_INDEX', nullable: false })
	@DbNumber()
	applicationIndex: Application_Index

	@Id()
	@Column({ name: 'TABLE_INDEX', nullable: false })
	@DbNumber()
	tableIndex?: ApplicationEntity_TableIndex

	@Id()
	@Column({ name: 'COLUMN_INDEX', nullable: false })
	@DbNumber()
	columnIndex?: ApplicationColumn_Index

	@Column({ name: 'SEQUENCE_INCREMENT_BY', nullable: false })
	@DbNumber()
	incrementBy?: SequenceIncrementBy

	@Column({ name: 'CURRENT_VALUE', nullable: false })
	@DbNumber()
	currentValue?: SequenceCurrentValue

}
