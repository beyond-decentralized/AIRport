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
	@JoinColumn({ name: 'REPOSITORY_ID', referencedColumnName: 'ID' })
	repository: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({ name: 'DATABASE_ID', referencedColumnName: 'ID' })
	database: Database

}
