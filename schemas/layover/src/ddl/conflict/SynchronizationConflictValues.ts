import {
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/tarmaq-entity'
import { DbColumn_Index, ISynchronizationConflictValues } from '@airport/ground-control'
import { SynchronizationConflict } from './SynchronizationConflict'

@Entity()
@Table({ name: 'SYNCHRONIZATION_CONFLICT_VALUES' })
export class SynchronizationConflictValues
	implements ISynchronizationConflictValues {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'SYNCHRONIZATION_CONFLICT_LID',
		referencedColumnName: 'SYNCHRONIZATION_CONFLICT_LID'
	})
	synchronizationConflict: SynchronizationConflict

	@Id()
	@DbNumber()
	columnIndex: DbColumn_Index

}