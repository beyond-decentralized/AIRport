import {
	Column,
	MappedSuperclass
}                         from '@airport/air-traffic-control'
import {RepositoryEntity} from '../repository/RepositoryEntity'

@MappedSuperclass()
export abstract class ImmutableRepoRow
	extends RepositoryEntity {

	@Column({name: 'CREATED_AT'})
	createdAt: Date

}
