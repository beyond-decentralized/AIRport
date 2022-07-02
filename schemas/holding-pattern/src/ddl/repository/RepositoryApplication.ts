import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                   from "@airport/air-traffic-control";
import { Application } from "@airport/airspace";
import {Repository} from './Repository'

export type RepositoryApplicationId = number;

@Entity()
@Table({
	name: "REPOSITORY_APPLICATIONS"
})
export class RepositoryApplication {

	@Id()
	@ManyToOne()
	@JoinColumn({name: "APPLICATION_INDEX", referencedColumnName: "APPLICATION_INDEX"})
	application: Application;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: Repository;

}