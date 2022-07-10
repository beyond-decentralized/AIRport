import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	Table
} from '@airport/tarmaq-entity'

export type SystemWideOperationId_Id = number;

/**
 * No actual records are inserted into this table, only used for the sequence
 */
@Entity()
@Table({name: 'SYSTEM_WIDE_OPERATION_LIDS'})
export class SystemWideOperationId {

	@Id()
	@Column({name: 'SYSTEM_WIDE_OPERATION_LID', nullable: false})
	@DbNumber()
	@GeneratedValue()
	_localId: SystemWideOperationId_Id

}