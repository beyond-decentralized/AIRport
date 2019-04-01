import {
	Column,
	JoinColumn,
	ManyToOne,
	MappedSuperclass
}                         from '@airport/air-control'
import {IUser}            from '@airport/travel-document-checkpoint'
import {RepositoryEntity} from '../repository/RepositoryEntity'

@MappedSuperclass()
export abstract class ImmutableRepoRow
	extends RepositoryEntity {

	@Column({name: 'CREATED_AT'})
	createdAt: Date

}
