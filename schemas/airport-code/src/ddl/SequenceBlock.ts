import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	SequenceGenerator,
	Table
}                         from '@airport/air-control'
import {Sequence}         from './Sequence'
import {SequenceConsumer} from './SequenceConsumer'

export type SequenceBlockId = number
export type SequenceBlockSize = number
export type SequenceBlockLastReservedId = number
export type SequenceBlockReservationMillis = number

@Entity()
@Table({name: 'SEQUENCE_BLOCKS'})
export class SequenceBlock {

	@Id()
	@GeneratedValue()
	@SequenceGenerator({allocationSize: 1000})
	id: SequenceBlockId

	@ManyToOne()
	@JoinColumn({name: 'SEQUENCE_ID', referencedColumnName: 'ID'})
	sequence: Sequence

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'CONSUMER_ID', referencedColumnName: 'ID'})
	consumer: SequenceConsumer

	size: SequenceBlockSize

	@Column({name: 'LAST_RESERVED_ID'})
	lastReservedId: SequenceBlockLastReservedId

	@Column({name: 'RESERVATION_MILLIS'})
	reservationMillis: SequenceBlockReservationMillis

}