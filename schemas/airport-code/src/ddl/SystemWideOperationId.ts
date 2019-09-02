import {
	Column,
	DbNumber,
	Entity,
	Id,
	Table
} from '@airport/air-control'

export type SystemWideOperationId_Id = number;

/**
 * No actual records are inserted into this table, only used for the sequence
 */
@Entity()
@Table({name: 'SYSTEM_WIDE_OPERATION_IDS'})
export class SystemWideOperationId {

	@Id()
	@Column({name: 'ID', nullable: false})
	@DbNumber()
	id: SystemWideOperationId_Id

}