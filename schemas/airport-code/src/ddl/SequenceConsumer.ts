import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	SequenceGenerator,
	Table
}               from '@airport/air-control'
import {Domain} from '@airport/territory'

export type SequenceConsumerId = number
export type SequenceConsumerCreateTimestamp = number
export type SequenceConsumerRandomNumber = number

@Entity()
@Table({name: 'SEQUENCE_CONSUMERS'})
export class SequenceConsumer {

	@Id()
	@Column({name: 'CREATE_TIMESTAMP', nullable: false})
	createTimestamp: SequenceConsumerCreateTimestamp

	@Id()
	@Column({name: 'RANDOM_NUMBER', nullable: false})
	randomNumber: SequenceConsumerRandomNumber

}
