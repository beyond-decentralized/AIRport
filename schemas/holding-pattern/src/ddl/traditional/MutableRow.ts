import {
	Column,
	MappedSuperclass
}                     from '@airport/air-control'
import {ImmutableRow} from './ImmutableRow'

@MappedSuperclass()
export class MutableRow
	extends ImmutableRow {

	@Column({name: 'UPDATED_AT'})
	updatedAt: Date

}
