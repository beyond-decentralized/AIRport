import {
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/air-traffic-control'
import { ApplicationColumn_Index } from '@airport/ground-control'
import { SynchronizationConflict } from './SynchronizationConflict'

@Entity()
@Table({ name: 'SYNCHRONIZATION_CONFLICT_VALUES' })
export class SynchronizationConflictValues {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'SYNCHRONIZATION_CONFLICT_LID',
		referencedColumnName: 'SYNCHRONIZATION_CONFLICT_LID'
	})
	synchronizationConflict: SynchronizationConflict

	@Id()
	@DbNumber()
	columnIndex: ApplicationColumn_Index

}