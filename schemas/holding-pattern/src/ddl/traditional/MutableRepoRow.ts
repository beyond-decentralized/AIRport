import {
	Column,
	MappedSuperclass
}                         from '@airport/air-traffic-control'
import {ImmutableRepoRow} from './ImmutableRepoRow'

@MappedSuperclass()
export class MutableRepoRow
	extends ImmutableRepoRow {

	@Column({name: 'UPDATED_AT'})
	updatedAt: Date

}
