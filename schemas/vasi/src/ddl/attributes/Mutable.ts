import {
	Column,
	MappedSuperclass
}                     from '@airport/air-control'
import {Immutable} from './Immutable'

@MappedSuperclass()
export abstract class Mutable
	extends Immutable {

	@Column({name: 'UPDATED_AT'})
	updatedAt: Date

}