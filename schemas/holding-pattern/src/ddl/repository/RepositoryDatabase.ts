import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/air-traffic-control";
import {
	Database
} from "@airport/travel-document-checkpoint";
import { Repository } from "./Repository";

@Entity()
@Table({
	name: "REPOSITORY_DATABASES"
})
export class RepositoryDatabase {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID'
	})
	repository: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'DATABASE_LID',
		referencedColumnName: 'DATABASE_LID'
	})
	database: Database

}
