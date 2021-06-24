import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	Table
}                           from '@airport/air-control'
import {SystemGenerated} from './attributes/SystemGenerated'

/**
 * Translation isn't necessarily from one language to another.
 *
 * You can translate to a different style for instance. You could
 * make a very technical poll more layman sounding.  Or make something
 * funny, etc.
 *
 * Internal Types like: Default, Best As voted, Best composite
 * User specified types: Funny, Abbreviated, Alegorical
 */
@Entity()
@Table({name: 'TRANSLATION_TYPES'})
export class TranslationType extends SystemGenerated {

	@Id()
	@GeneratedValue()
	@Column({name: 'TRANSLATION_TYPE_ID'})
	id: number

	@Column({name: 'TRANSLATION_TYPE_CODE'})
	code: string

}
