import {MappedSuperclass} from '@airport/air-control'
import {RepositoryEntity} from '../repository/RepositoryEntity'

@MappedSuperclass()
export abstract class ChildRepoRow
	extends RepositoryEntity {

}