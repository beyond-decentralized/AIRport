import { ISystemWideOperationId, SystemWideOperationId_Id } from '@airport/ground-control'
import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	Table
} from '@airport/tarmaq-entity'

/**
 * No actual records are inserted into this table, only used for the sequence
 */
@Entity()
@Table({ name: 'SYSTEM_WIDE_OPERATION_LIDS' })
export class SystemWideOperationId
	implements ISystemWideOperationId {

	@Id()
	@Column({ name: 'SYSTEM_WIDE_OPERATION_LID', nullable: false })
	@DbNumber()
	@GeneratedValue()
	_localId: SystemWideOperationId_Id

}