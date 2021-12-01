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
	name: "REPOSITORY_SCHEMAS"
})
export class RepositoryApplication {

	@Id()
	@Column({name: "REPOSITORY_SCHEMA_ID"})
	@GeneratedValue()
	@DbNumber()
	id: RepositoryApplicationId;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: Repository;

	@Column({name: "SCHEMA_INDEX", nullable: false})
	@DbNumber()
	applicationIndex: ApplicationIndex;

}