import {
	Column,
	Entity,
	Id,
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
	id: SequenceConsumerId

	@Column({name: 'CREATE_TIMESTAMP'})
	createTimestamp: SequenceConsumerCreateTimestamp

	@Column({name: 'RANDOM_NUMBER'})
	randomNumber: SequenceConsumerRandomNumber

	@Column({name: 'DOMAIN'})
	domain: Domain

}