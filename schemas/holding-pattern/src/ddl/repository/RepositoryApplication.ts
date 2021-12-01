import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                   from "@airport/air-control";
import {
	ApplicationIndex,
}                   from "@airport/ground-control";
import {Repository} from './Repository'

export type RepositoryApplicationId = number;

@Entity()
@Table({
	name: "REPOSITORY_APPLICATIONS"
})
export class RepositoryApplication {

	@Id()
	@Column({name: "REPOSITORY_APPLICATION_ID"})
	@GeneratedValue()
	@DbNumber()
	id: RepositoryApplicationId;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: Repository;

	@Column({name: "APPLICATION_INDEX", nullable: false})
	@DbNumber()
	applicationIndex: ApplicationIndex;

}