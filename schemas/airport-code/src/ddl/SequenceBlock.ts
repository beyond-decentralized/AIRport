import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	JoinColumns,
	ManyToOne,
	SequenceGenerator,
	Table,
	Transient
}                 from '@airport/air-control'
import {Sequence} from './Sequence'

export type SequenceBlockId = number
export type SequenceBlockSize = number
export type SequenceBlockLastReservedId = number
export type SequenceBlockReservationMillis = number
export type SequenceBlockCurrentNumber = number

@Entity()
@Table({name: 'SEQUENCE_BLOCKS'})
export class SequenceBlock {

	@Id()
	@GeneratedValue()
	@SequenceGenerator({allocationSize: 1000})
	id: SequenceBlockId

	// Have to reference by indexes to avoid adding a @GeneratedValue
	// on SequenceBlock, which would greatly complicate bootstraping
	// of AP for the first time
	@ManyToOne()
	@JoinColumns([{
		name: 'SCHEMA_INDEX', nullable: false
	}, {
		name: 'TABLE_INDEX', nullable: false
	}, {
		name: 'COLUMN_INDEX', nullable: false
	}])
	sequence: Sequence

	@Column({name: 'SIZE', nullable: false})
	size: SequenceBlockSize

	@Column({name: 'LAST_RESERVED_ID', nullable: false})
	lastReservedId: SequenceBlockLastReservedId

	@Column({name: 'RESERVATION_MILLIS', nullable: false})
	reservationMillis: SequenceBlockReservationMillis

	@Transient()
	currentNumber: SequenceBlockCurrentNumber

}
