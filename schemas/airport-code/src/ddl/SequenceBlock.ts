import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	SequenceGenerator,
	Table,
	Transient
}                         from '@airport/air-control'
import {Sequence}         from './Sequence'
import {SequenceConsumer} from './SequenceConsumer'

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

	@ManyToOne()
	@JoinColumn({name: 'SEQUENCE_ID', referencedColumnName: 'ID', nullable: false})
	sequence: Sequence

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'CONSUMER_ID', referencedColumnName: 'ID', nullable: false})
	sequenceConsumer: SequenceConsumer

	@Column({name: 'SIZE', nullable: false})
	size: SequenceBlockSize

	@Column({name: 'LAST_RESERVED_ID', nullable: false})
	lastReservedId: SequenceBlockLastReservedId

	@Column({name: 'RESERVATION_MILLIS', nullable: false})
	reservationMillis: SequenceBlockReservationMillis

	@Transient()
	currentNumber: SequenceBlockCurrentNumber
}