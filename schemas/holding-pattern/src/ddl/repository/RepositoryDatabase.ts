import { IRepositoryDatabase } from "@airport/ground-control";
import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/tarmaq-entity";
import {
	Database
} from "@airport/travel-document-checkpoint/dist/app/bundle";
import { Repository } from "./Repository";

@Entity()
@Table({
	name: "REPOSITORY_DATABASES"
})
export class RepositoryDatabase
	implements IRepositoryDatabase {

	@Id()
	@ManyToOne()
	@JoinColumn({ name: 'REPOSITORY_LID' })
	repository: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({ name: 'DATABASE_LID' })
	database: Database

}
