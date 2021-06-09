import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	Table
}                           from '@airport/air-control'

import {SystemGenerated} from './attributes/SystemGenerated'

@Entity()
@Table({name: 'LANGUAGES'})
export class Language
	extends SystemGenerated {

	@Id()
	@GeneratedValue()
	@Column({name: 'LANGUAGE_ID'})
	id: number

	@Column({name: 'LANGUAGE_NAME'})
	name: string

}
