import {
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                                from '@airport/air-control'
import {ColumnIndex}             from '@airport/ground-control'
import {SynchronizationConflict} from './SynchronizationConflict'

@Entity()
@Table({name: 'SYNCHRONIZATION_CONFLICT_VALUES'})
export class SynchronizationConflictValues {

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'SYNCHRONIZATION_CONFLICT_ID', referencedColumnName: 'ID'})
	synchronizationConflict: SynchronizationConflict

	@Id()
	@DbNumber()
	columnIndex: ColumnIndex

}