import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/tarmaq-entity";
import { Application } from "@airport/airspace";
import { Repository } from './Repository'

@Entity()
@Table({
	name: "REPOSITORY_APPLICATIONS"
})
export class RepositoryApplication {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "APPLICATION_INDEX",
		referencedColumnName: "APPLICATION_INDEX",
		nullable: false
	})
	application: Application;

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID',
		nullable: false
	})
	repository: Repository;

}
