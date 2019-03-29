import {
	Column,
	MappedSuperclass
}                         from '@airport/air-control'
import {ImmutableRepoRow} from './ImmutableRepoRow'

@MappedSuperclass()
export class MutableRepoRow
	extends ImmutableRepoRow {

	@Column({name: 'UPDATED_AT'})
	updatedAt: Date

}
