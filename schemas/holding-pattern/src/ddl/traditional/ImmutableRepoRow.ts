import {
	Column,
	MappedSuperclass
}                         from '@airport/air-traffic-control'
import {AirEntity} from '../repository/AirEntity'

@MappedSuperclass()
export abstract class ImmutableRepoRow
	extends AirEntity {

	@Column({name: 'CREATED_AT'})
	createdAt: Date

}
