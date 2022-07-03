import {
	Column,
	DbNumber,
	Entity,
	Id,
	Table
}               from '@airport/air-traffic-control'
import {
	ApplicationColumn_Index,
	Application_Index,
	ApplicationEntity_TableIndex
}               from '@airport/ground-control'

export type SequenceIncrementBy = number
export type SequenceCurrentValue = number

@Entity()
@Table({name: 'SEQUENCES'})
export class Sequence {

	@Id()
	@Column({name: 'APPLICATION_INDEX', nullable: false})
	@DbNumber()
	applicationIndex: Application_Index

	@Id()
	@Column({name: 'TABLE_INDEX', nullable: false})
	@DbNumber()
	tableIndex: ApplicationEntity_TableIndex

	@Id()
	@Column({name: 'COLUMN_INDEX', nullable: false})
	@DbNumber()
	columnIndex: ApplicationColumn_Index

	@Column({name: 'SEQUENCE_INCREMENT_BY', nullable: false})
	incrementBy: SequenceIncrementBy

	@Column({name: 'CURRENT_VALUE', nullable: false})
	currentValue: SequenceCurrentValue

}
